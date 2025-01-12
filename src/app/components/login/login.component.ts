import { Component, inject } from '@angular/core';
import { MeterialModule } from '../../../Meterial.Module';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
@Component({
  selector: 'app-login',
  imports: [MeterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSignUp: boolean = true;
  isError: string = '';

  authsrv = inject(AuthService)

  readonly username = new FormControl('',{
    validators : [
      Validators.required,
      Validators.minLength(3),
    ]
  });

  onSignUp(){
    this.username.markAsTouched();

    if (this.username.valid) {
      console.log('No errors. Form is valid!');
      this.createUser(this.username.value);
    }
  }

  createUser(user: any) {
    this.authsrv.initRegister(user).subscribe({
      next: (res) => {
        const optionsJSON = res;
        console.log('Registration options received:', optionsJSON);
        this.handleWebAuthnRegistration(optionsJSON);
      },
      error: (err) => {
        console.error('Error during registration:', err);
        if (err.error && err.error.message) {
          this.isError = err.error.message;
        } else {
          this.isError = 'Username Already Exists';
        }
      },
    });
  }
  

  async handleWebAuthnRegistration(optionsJSON: any): Promise<void>{
    try {
      // Start registration with the registration options
      const attResp = await startRegistration({ optionsJSON });
      console.log(attResp);
      this.isError = '';
      this.authsrv.verifyRegister(optionsJSON, attResp).subscribe((res: any ) => {
        this.isError = 'registered success';
        setTimeout(() => {
          this.onTabSwitch();
        }, 5000);
      })
    } catch (err) {
      console.error('Error during registration');
      this.isError = 'An error occurred during registration';
    }
  }

  onLogin(){
    this.username.markAsTouched();

    if (this.username.valid) {
      console.log('No errors. Form is valid!');
      this.validateUser(this.username.value);
    }
  }

  validateUser(user: any) {
    this.authsrv.initAuth(user).subscribe({
      next: (res) => {

        const optionsJSON = res;
        console.log('going inside handleWebAuthnLogin')
        this.handleWebAuthnLogin(optionsJSON);
      },
      error: (err) => {
        console.error('Error from backend:', err);
        if (err.error && err.error.message) {
          this.isError = err.error.message;
        } else {
          this.isError = 'User Not Found! Please Register';
        }
      },
    });
  }

  async handleWebAuthnLogin(optionsJSON: any): Promise<void>{
    console.log('inside web authn login');
    try {
      const attResp = await startAuthentication({ optionsJSON });
      this.isError = '';
      this.authsrv.verifyAuth(optionsJSON, attResp).subscribe((res: any )=> {
        if(res.verified == true){
          this.isError = 'login success';
        }else{
          this.isError = 'Login Failure';
        }
        
      })
    } catch (err) {
      console.error('Error during authentication');
      this.isError = 'Login Failure';
    }
  }

  onTabSwitch(){
    this.isSignUp = !this.isSignUp;
    this.username.reset();
    this.isError = '';
  }
}

interface AuthResponse {
  verified: boolean;
  error?: string;  // Optionally, you might have an error field
}