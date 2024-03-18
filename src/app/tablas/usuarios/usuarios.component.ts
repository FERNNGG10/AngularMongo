import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameDataInterface, GameIndexInterface } from '../../interfaces/GameIndexInterface.interface';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormControl, FormsModule, ReactiveFormsModule ,FormGroup,Validators } from '@angular/forms';
import { CategoryIndexInterface } from '../../interfaces/CategoryIndexInterface.interface';
import { SupplierIndexInterface } from '../../interfaces/SupplierIndexInterface.interface';
import { ClassificationIndexInterface } from '../../interfaces/ClassificationIndexInterface.interface';
import { DeveloperIndexInterface } from '../../interfaces/DeveloperIndexInterface.interface';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { RolesS, UserDataInterface, UserIndexInterface } from '../../interfaces/UsersIndexInterface.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

  public users: UserIndexInterface={users:[]};
  public userdata:UserDataInterface={name:'',email:'',password:'',password_confirmation:'',rol_id:2};
  public msg='';
  public id=0;
  public errors={
    name:'',email:'',password:'',rol_id:'',
  }

  public roles: RolesS={roles:[]};
  constructor(private user:UsersService) { }

  userform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rol_id: new FormControl(2, [Validators.required]),
  });

  get name() { return this.userform.get('name'); }
  get email() { return this.userform.get('email'); }
  get password() { return this.userform.get('password'); }
  get password_confirmation() { return this.userform.get('password_confirmation'); }

  ngOnInit(): void {
    this.user.index().subscribe((response)=>{
      this.users = response;
    });

    this.user.roles().subscribe((response)=>{
      this.roles = response;
    });
  }

  store():void{
    this.userdata = {
      name: this.userform.value.name || '',
      email: this.userform.value.email || '',
      password: this.userform.value.password || '',
      password_confirmation: this.userform.value.password_confirmation || '',
      rol_id: this.userform.value.rol_id || 2,
    };
    this.user.store(this.userdata).subscribe((response)=>{
      this.msg = response.msg;
      setTimeout(()=>{this.msg=''},3000);
      this.userform.reset();
      this.user.index().subscribe((response)=>{
        this.users = response;
      });
    },(error)=>{
      this.errors.name = error.error.errors.name;
      this.errors.email = error.error.errors.email;
      this.errors.password = error.error.errors.password;
      this.errors.rol_id = error.error.errors.rol_id;
    });
  }

  deleteid(id:number):void{
    this.id = id;
  }

  delete():void{
    this.user.delete(this.id).subscribe((response)=>{
      this.msg = response.msg;
      setTimeout(()=>{this.msg=''},3000);
      this.id = 0;
      this.user.index().subscribe((response)=>{
        this.users = response;
      });
    });
  }



}
