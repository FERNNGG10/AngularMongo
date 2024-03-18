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
import { GadgetDataInterface, GadgetIndexInterface } from '../../../interfaces/GadgetIndexInterface.interface';
import { GadgetsService } from '../../../services/gadgets.service';

@Component({
  selector: 'app-gadgetedit',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './gadgetedit.component.html',
  styleUrl: './gadgetedit.component.css'
})
export class GadgeteditComponent implements OnInit{
  @Input('id') id!: string
  public suppliers:SupplierIndexInterface={suppliers:[]};
  gadgetform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    price: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(50)]),
    stock: new FormControl(0, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    supplier_id: new FormControl(0, [Validators.required]),
  });
  public errors={
    name:'',price:'',stock:'',supplier_id:'',description:''
  } 
  constructor(private gadget:GadgetsService,private game:GameService,private router:Router) { }

  ngOnInit(): void {
    this.gadget.show(parseInt(this.id)).subscribe(data=>{
      this.gadgetform.setValue({
        name:data.gadget.name,
        price:data.gadget.gadget_inventory.price,
        description:data.gadget.description,
        stock:data.gadget.gadget_inventory.stock,
        supplier_id:data.gadget.supplier_id,
      });
    },(error)=>{
      this.router.navigate(['/not-found'])
    });
    this.game.suppliers().subscribe((response)=>{
      this.suppliers = response;
    });
  }

  update():void{
    this.gadget.update(parseInt(this.id),{
      name: this.gadgetform.value.name || '',
      price: Number(this.gadgetform.value.price) || 0,
      description: this.gadgetform.value.description || '',
      stock: Number(this.gadgetform.value.stock) || 0,
      supplier_id: Number(this.gadgetform.value.supplier_id) || 0,
    }).subscribe((response)=>{
      this.router.navigate(['home/gadgets']);
    },(error)=>{
      this.errors.name = error.error.errors.name;
      this.errors.price = error.error.errors.price;
      this.errors.stock = error.error.errors.stock;
      this.errors.supplier_id = error.error.errors.supplier_id;
      this.errors.description = error.error.errors.description;
    });
  }

}
