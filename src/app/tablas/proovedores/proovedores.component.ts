import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameDataInterface, GameIndexInterface } from '../../interfaces/GameIndexInterface.interface';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormControl, FormsModule, ReactiveFormsModule ,FormGroup,Validators } from '@angular/forms';
import { CategoryIndexInterface } from '../../interfaces/CategoryIndexInterface.interface';
import { SupplierDataInterface, SupplierIndexInterface } from '../../interfaces/SupplierIndexInterface.interface';
import { ClassificationIndexInterface } from '../../interfaces/ClassificationIndexInterface.interface';
import { DeveloperDataInterface, DeveloperIndexInterface } from '../../interfaces/DeveloperIndexInterface.interface';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { DevelopersService } from '../../services/developers.service';
import { SuppliersService } from '../../services/suppliers.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-proovedores',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './proovedores.component.html',
  styleUrl: './proovedores.component.css'
})
export class ProovedoresComponent implements OnInit {
  public suppliers:SupplierIndexInterface={suppliers:[]};
  public supplierdata:SupplierDataInterface={name:'',email:'',phone:''};
  public msg='';
  rol=0;
  public id=0;
  public errors={
    name:'',email:'',phone:''
  }
  constructor(private supplier:SuppliersService,private auth:AuthService) { }

  supplierform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
  });

  get name() { return this.supplierform.get('name'); }
  get email() { return this.supplierform.get('email'); }
  get phone() { return this.supplierform.get('phone'); }

  ngOnInit(): void {
    this.supplier.index().subscribe((response)=>{
      this.suppliers = response;
    });
    this.auth.rolid().subscribe((response)=>{
      this.rol = response
    });
  }

  store():void{
    this.supplierdata = {
      name: this.supplierform.value.name || '',
      email: this.supplierform.value.email || '',
      phone: this.supplierform.value.phone || '',
    };
    this.supplier.store(this.supplierdata).subscribe((response)=>{
      this.msg = response.msg;
      console.log(response.msg);
      console.log(response);
      setTimeout(()=>{this.msg=''},3000);
      this.supplierform.reset();
      this.supplier.index().subscribe((response)=>{
        this.suppliers = response;
      });
    },(error)=>{
      console.log(error.error);
      console.log(error.error.errors);
      this.errors.name = error.error.errors.name;
      this.errors.email = error.error.errors.email;
      this.errors.phone = error.error.errors.phone;
    });
  }

  deleteid(id:number):void{ 
    this.id = id;
  }

  delete():void{
    this.supplier.delete(this.id).subscribe((response)=>{
      this.msg = response.msg;
      console.log(response.msg);
      console.log(response);
      this.id = 0;
      setTimeout(()=>{this.msg=''},3000);
      this.supplier.index().subscribe((response)=>{
        this.suppliers = response;
      });
    });
  }
}
