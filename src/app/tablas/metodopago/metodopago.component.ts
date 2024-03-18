import { Component, OnInit } from '@angular/core';
import { ConsolesService } from '../../services/consoles.service';
import { ConsoleDataInterface, ConsoleIndexInterface } from '../../interfaces/ConsoleIndexInterface.interface';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { SupplierIndexInterface } from '../../interfaces/SupplierIndexInterface.interface';
import { GameService } from '../../services/game.service';
import { CategoryDataInterface, CategoryIndexInterface } from '../../interfaces/CategoryIndexInterface.interface';
import { CategoriesService } from '../../services/categories.service';
import { PaymentDataInterface, PaymenthIndexInterface } from '../../interfaces/PaymenthIndexInterface.interface';
import { MetodopagoService } from '../../services/metodopago.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-metodopago',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './metodopago.component.html',
  styleUrl: './metodopago.component.css'
})
export class MetodopagoComponent implements OnInit{

  public metodos:PaymenthIndexInterface={payment_methods:[]};
  public metododata:PaymentDataInterface={method:''};
  msg='';
  rol=0;
  id=0;
  errors={
    method:'',
  }
  constructor(private metod:MetodopagoService,private auth:AuthService) { }

  ngOnInit(): void {
    this.metod.index().subscribe((response)=>{
      this.metodos = response;
    });
    this.auth.rolid().subscribe((response)=>{
      this.rol = response
    });
  }

  metodoform = new FormGroup({
    method: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
  });

  get method() { return this.metodoform.get('method'); }

  deleteid(id:number):void{
    this.id = id;
    console.log(this.id);
  }

  store():void{
    this.metododata = {
      method: this.metodoform.value.method || '',
    };

    this.metod.store(this.metododata).subscribe((response)=>{
      console.log(response.msg);
      this.msg = response.msg;
      setTimeout(()=>{this.msg=''},3000);
      this.metodoform.reset();
      this.metod.index().subscribe((response)=>{
        this.metodos = response;
      });
      
    },(error)=>{
      console.log(error);
      console.log(error.error);
      console.log(error.error.errors);
      this.errors.method = error.error.errors.method;

    });
  }

  delete():void{
    this.metod.delete(this.id).subscribe((response)=>{
      console.log(response.msg);
      this.msg = response.msg;
      this.id = 0;
      setTimeout(()=>{this.msg=''},3000);
      this.metod.index().subscribe((response)=>{
        this.metodos = response;
      });
    });
  }

}
