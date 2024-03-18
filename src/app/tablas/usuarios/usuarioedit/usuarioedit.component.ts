import { ImplicitReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { GameDataInterface, GameIndexInterface } from '../../../interfaces/GameIndexInterface.interface';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FormControl, FormsModule, ReactiveFormsModule ,FormGroup,Validators } from '@angular/forms';
import { CategoryIndexInterface } from '../../../interfaces/CategoryIndexInterface.interface';
import { SupplierIndexInterface } from '../../../interfaces/SupplierIndexInterface.interface';
import { ClassificationIndexInterface } from '../../../interfaces/ClassificationIndexInterface.interface';
import { DeveloperIndexInterface } from '../../../interfaces/DeveloperIndexInterface.interface';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { RolesS, UserDataInterface, UserIndexInterface } from '../../../interfaces/UsersIndexInterface.interface';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-usuarioedit',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './usuarioedit.component.html',
  styleUrl: './usuarioedit.component.css'
})
export class UsuarioeditComponent implements OnInit{

  @Input('id') id!: string
  public errors={
    name:'',email:'',password:'',rol_id:'',status:'',
  }

  public roles: RolesS={roles:[]};
  constructor(private user:UsersService,private router:Router) { }
  userform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rol_id: new FormControl(1, [Validators.required]),
    status: new FormControl(0),
  });

  ngOnInit(): void {
    this.user.show(Number(this.id)).subscribe((response) => {
      this.userform.patchValue({
        name: response.user.name,
        email: response.user.email,
        rol_id: response.user.rol_id,
        status: response.user.status
      });
    },(error)=>{
      console.log(error);
      console.log(error.error);
      this.router.navigate(['/not-found']);
    });

    this.user.roles().subscribe((response)=>{
      this.roles = response;
    });
  }

  update():void{
    this.user.update(Number(this.id),{
      name: this.userform.value.name || '',
      email: this.userform.value.email || '',
      password: this.userform.value.password || '',
      rol_id: this.userform.value.rol_id || 0,
      status: this.userform.value.status || 0,
    }).subscribe((response)=>{
      console.log(response);
      this.router.navigate(['home/usuarios'])
    },(error)=>{
      console.log(error.error);
      this.errors.name = error.error.errors.name;
      this.errors.email = error.error.errors.email;
      this.errors.password = error.error.errors.password;
      this.errors.rol_id = error.error.errors.rol_id;
      this.errors.status = error.error.errors.status;
    }
    );
  }
}


