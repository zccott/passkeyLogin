import { Component } from '@angular/core';
import { MeterialModule } from '../../../Meterial.Module';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [MeterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSignUp: boolean = true;

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
      console.log('Username:', this.username.value);
    }
  }

  onTabSwitch(){
    this.isSignUp = !this.isSignUp;
    this.username.reset();
  }
}
