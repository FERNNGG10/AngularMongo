import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule ,FormGroup,Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterDataInterface } from '../interfaces/RegisterData.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public register:RegisterDataInterface = {name:'',email:'',password:'',password_confirmation:''};
  public errors={
    name:'',
    email:'',
    password:'',
  } 
  constructor(private auth:AuthService,private route:Router) {
   }
   registrerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  get name() { return this.registrerForm.get('name'); }
  get email() { return this.registrerForm.get('email'); }
  get password() { return this.registrerForm.get('password'); }
  get confirmPassword() { return this.registrerForm.get('password_confirmation'); }

  Onsubmit():void{
    this.auth.register(this.register).subscribe((response)=>{
      console.log(response.msg);
      this.route.navigate(['/login']);
    },(error)=>{
      console.log(error.error);
      console.log(error.error.errors); 
      this.errors.name = error.error.errors.name;
      this.errors.email = error.error.errors.email;
      this.errors.password = error.error.errors.password;
      
    })
  }

}
