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
import { GadgetDataInterface, GadgetIndexInterface } from '../../interfaces/GadgetIndexInterface.interface';
import { GadgetsService } from '../../services/gadgets.service';
import { AuthService } from '../../services/auth.service';
import { webSocket,WebSocketSubject,WebSocketSubjectConfig } from 'rxjs/webSocket';


@Component({
  selector: 'app-gadgets',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './gadgets.component.html',
  styleUrl: './gadgets.component.css'
})
export class GadgetsComponent implements OnInit{
  public gadgets:GadgetIndexInterface={gadgets:[]};
  public suppliers:SupplierIndexInterface={suppliers:[]};
  public gadgetdata:GadgetDataInterface={name:'',price:0,stock:0,supplier_id:0,description:''};  
  public msg='';
  rol=0;
  public id=0;
  
  
  public errors={
    name:'',price:'',stock:'',supplier_id:'',description:''
  } 
  constructor(private gadget:GadgetsService,private game:GameService,private auth:AuthService) { 
    
  }

  ngOnInit(): void {
    this.gadget.index().subscribe((response)=>{
      this.gadgets = response;
    });
    this.game.suppliers().subscribe((response)=>{
      this.suppliers = response;
    });
    this.auth.rolid().subscribe((response)=>{
      this.rol = response
    });
  }
  gadgetform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    price: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(50)]),
    stock: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    supplier_id: new FormControl('', [Validators.required]),
  });

  get name() { return this.gadgetform.get('name'); }
  get price() { return this.gadgetform.get('price'); }
  get description() { return this.gadgetform.get('description'); }
  get stock() { return this.gadgetform.get('stock'); }
  get supplier_id() { return this.gadgetform.get('supplier_id'); }

  store():void{
    this.gadgetdata = {
      name: this.gadgetform.value.name ?? '',
      price: Number(this.gadgetform.value.price) ?? 0,
      description: this.gadgetform.value.description ?? '',
      stock: Number(this.gadgetform.value.stock) ?? 0,
      supplier_id: Number(this.gadgetform.value.supplier_id) ?? 0,
    };
    console.log(this.gadgetdata);
    console.log(this.gadgetform.value);

    this.gadget.store(this.gadgetdata).subscribe((response)=>{
      console.log(response.msg);
      this.msg = response.msg;
      setTimeout(()=>{this.msg=''},3000);
      this.gadgetform.reset();
      this.gadget.index().subscribe((response)=>{
        this.gadgets = response;
      });
      
    },(error)=>{
      console.log(error.error);
      console.log(error.error.errors);
      this.errors.name = error.error.errors.name;
      this.errors.price = error.error.errors.price;
      this.errors.description = error.error.errors.description;
      this.errors.stock = error.error.errors.stock;
      this.errors.supplier_id = error.error.errors.supplier_id;
      
    });
  }

  deleteid(id:number):void{
    this.id = id;
    console.log(this.id);
  }

  delete():void{
    this.gadget.delete(this.id).subscribe((response)=>{
      console.log(response.msg);
      this.msg = response.msg;
      this.id = 0;
      setTimeout(()=>{this.msg=''},3000);
      this.gadget.index().subscribe((response)=>{
        this.gadgets = response;
      });
    });
  }
    
}
