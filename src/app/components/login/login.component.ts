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


  onLogin(){
    this.username.markAsTouched();

    if (this.username.valid) {
      console.log('No errors. Form is valid!');
      // this.createUser(this.username.value);
    }
  }
  onSignUp(){
    this.username.markAsTouched();

    if (this.username.valid) {
      console.log('No errors. Form is valid!');
      this.createUser(this.username.value);
    }
  }

  createUser(user: any){
    this.authsrv.initRegister(user).subscribe(res => {
      const optionsJSON = res
      this.handleWebAuthnRegistration(optionsJSON);
    });
  }

  async handleWebAuthnRegistration(optionsJSON: any): Promise<void>{
    try {
      // Start registration with the registration options
      const attResp = await startRegistration({ optionsJSON });
      console.log(attResp);
      this.isError = '';
      this.authsrv.verifyRegister(optionsJSON, attResp).subscribe(res => {
        this.isError = 'registered success';
        this.onTabSwitch();
      })
    } catch (err) {
      console.error('Error during registration', err);
      this.isError = 'An error occurred during registration';
    }
  }

  onTabSwitch(){
    this.isSignUp = !this.isSignUp;
    this.username.reset();
    this.isError = '';
  }
}
