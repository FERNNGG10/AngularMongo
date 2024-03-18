import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,FormControl,ReactiveFormsModule} from "@angular/forms";
import { LoginDataInterface } from '../interfaces/LoginDataInterface.interface';
import { CodeDataInterface } from '../interfaces/CodeData.interface';
import { AuthService } from '../services/auth.service';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public login_response : String|null = null;
    public Login:LoginDataInterface={email:'',password:''}
    public code:CodeDataInterface = {code:'',email:'',password:''};
    public code_response : String|null = null;
    show_code = false;
    back = true;
    msg=''
    error ='';
    constructor(private auth:AuthService,private router:Router){}
    login():void{
      this.auth.login(this.Login).subscribe((response)=>{
        this.back = false;
        this.show_code = true;
        this.code.email = this.Login.email;
        this.code.password = this.Login.password;
        console.log(response.msg);
        this.code_response = response.msg;
        
      },(error)=>{
       
        this.msg = error.error;
        
      })
    }

    verify_code():void{
      this.auth.verify_code(this.code).subscribe((response)=>{
        if(response.access_token){
          localStorage.setItem('token',response.access_token);
          console.log(response.access_token);
          this.router.navigate(['/home']);
        }
      },(error)=>{
        this.error = error.error;
      })
      ;
    }
}
