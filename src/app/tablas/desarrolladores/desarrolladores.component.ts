import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameDataInterface, GameIndexInterface } from '../../interfaces/GameIndexInterface.interface';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormControl, FormsModule, ReactiveFormsModule ,FormGroup,Validators } from '@angular/forms';
import { CategoryIndexInterface } from '../../interfaces/CategoryIndexInterface.interface';
import { SupplierIndexInterface } from '../../interfaces/SupplierIndexInterface.interface';
import { ClassificationIndexInterface } from '../../interfaces/ClassificationIndexInterface.interface';
import { DeveloperDataInterface, DeveloperIndexInterface } from '../../interfaces/DeveloperIndexInterface.interface';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { DevelopersService } from '../../services/developers.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-desarrolladores',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './desarrolladores.component.html',
  styleUrl: './desarrolladores.component.css'
})
export class DesarrolladoresComponent implements OnInit {

  public developers:DeveloperIndexInterface={developers:[]};
  public developerdata:DeveloperDataInterface={name:'',email:'',phone:''};
  public msg='';
  rol=0;
  public id=0;
  public errors={
    name:'',email:'',phone:''
  }
  constructor(private developer:DevelopersService,private auth:AuthService) { }

  developerform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
  });

  get name() { return this.developerform.get('name'); }
  get email() { return this.developerform.get('email'); }
  get phone() { return this.developerform.get('phone'); }
  
  ngOnInit(): void {
    this.developer.index().subscribe((response)=>{
      this.developers = response;
    });
    this.auth.rolid().subscribe((response)=>{
      this.rol = response
    });
  }

  store():void{
    this.developerdata = {
      name: this.developerform.value.name || '',
      email: this.developerform.value.email || '',
      phone: this.developerform.value.phone || '',
    };
    this.developer.store(this.developerdata).subscribe((response)=>{
      this.msg = response.msg;
      console.log(response.msg);
      console.log(response);
      setTimeout(()=>{this.msg=''},3000);
      this.developerform.reset();
      this.developer.index().subscribe((response)=>{
        this.developers = response;
      }); 

    },(error)=>{
      console.log(error.error);
      console.log(error.error.errors); 
      this.errors.name = error.error.errors.name;
      this.errors.email = error.error.errors.email;
      this.errors.phone = error.error.errors.phone;
    })
  }
  deleteid(id:number):void{
    this.id = id;
  }
  delete():void{
    this.developer.delete(this.id).subscribe((response)=>{
      this.msg = response.msg;
      console.log(response.msg);
      console.log(response);
      setTimeout(()=>{this.msg=''},3000);
      this.id = 0;
      this.developer.index().subscribe((response)=>{
        this.developers = response;
      });
    });
  }

}
