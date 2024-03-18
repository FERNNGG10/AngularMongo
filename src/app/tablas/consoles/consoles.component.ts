import { Component, OnInit } from '@angular/core';
import { ConsolesService } from '../../services/consoles.service';
import { ConsoleDataInterface, ConsoleIndexInterface } from '../../interfaces/ConsoleIndexInterface.interface';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { SupplierIndexInterface } from '../../interfaces/SupplierIndexInterface.interface';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-consoles',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './consoles.component.html',
  styleUrl: './consoles.component.css'
})
export class ConsolesComponent implements OnInit{

  public consoles:ConsoleIndexInterface={consoles:[]};
  public consoledata:ConsoleDataInterface={name:'',description:'',price:0,stock:0,supplier_id:0};
  public suppliers:SupplierIndexInterface={suppliers:[]};
  msg='';
  id=0;
  rol=0;
  public errors={
    name:'',description:'',price:"",stock:"",supplier_id:""
  } 
  constructor(private console:ConsolesService,private game:GameService,private auth:AuthService) { }

  ngOnInit(): void {
    this.console.index().subscribe((response)=>{
      this.consoles = response;
    });
    this.game.suppliers().subscribe((response)=>{
      this.suppliers = response;
    });
    this.auth.rolid().subscribe((response)=>{
      this.rol = response
    });
  }
  consoleform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(50)]),
    price: new FormControl(0, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    stock: new FormControl(0, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    supplier_id: new FormControl(1, [Validators.required]),
  
  });
  get name() { return this.consoleform.get('name'); }
  get description() { return this.consoleform.get('description'); }
  get price() { return this.consoleform.get('price'); }
  get stock() { return this.consoleform.get('stock'); }
  get supplier_id() { return this.consoleform.get('supplier_id'); }

  store():void{
    this.consoledata = {
      name: this.consoleform.value.name || '',
      description: this.consoleform.value.description || '',
      price: Number(this.consoleform.value.price) || 0,
      stock: Number(this.consoleform.value.stock) || 0,
      supplier_id: Number(this.consoleform.value.supplier_id) || 0,
    };

    this.console.store(this.consoledata).subscribe((response)=>{
      console.log(response.msg);
      this.msg = response.msg;
      setTimeout(()=>{this.msg=''},3000);
      this.consoleform.reset();
      this.console.index().subscribe((response)=>{
        this.consoles = response;
        console.log(this.consoles);
      },(error)=>{
        console.log(error);
        console.log(error.error);
      });
    },(error)=>{
      console.log(error.error);
      console.log(error.error.errors);
      this.errors.name = error.error.errors.name;
      this.errors.description = error.error.errors.description;
      this.errors.price = error.error.errors.price;
      this.errors.stock = error.error.errors.stock;
      this.errors.supplier_id = error.error.errors.supplier_id;
      
    });
  }

  deleteid(id:number):void{
    this.id = id;
  }

  delete():void{
    this.console.delete(this.id).subscribe((response)=>{
      console.log(response.msg);
      this.msg = response.msg;
      setTimeout(()=>{this.msg=''},3000);
      this.id = 0;
      this.console.index().subscribe((response)=>{
        this.consoles = response;
        console.log(this.consoles);
      },(error)=>{
        console.log(error);
        console.log(error.error);
      });
    },(error)=>{
      console.log(error.error);
    });
  }


}
