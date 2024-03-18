import { Component, Input, OnInit } from '@angular/core';
import { ConsolesService } from '../../../services/consoles.service';
import { ConsoleDataInterface, ConsoleIndexInterface } from '../../../interfaces/ConsoleIndexInterface.interface';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { SupplierIndexInterface } from '../../../interfaces/SupplierIndexInterface.interface';
import { GameService } from '../../../services/game.service';
@Component({
  selector: 'app-consoleedit',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './consoleedit.component.html',
  styleUrl: './consoleedit.component.css'
})
export class ConsoleeditComponent implements OnInit{
  @Input('id') id!: string
  public suppliers:SupplierIndexInterface={suppliers:[]};
  consoleform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(50)]),
    price: new FormControl(0, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    stock: new FormControl(0, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    supplier_id: new FormControl(1, [Validators.required]),
  
  });
  public errors={
    name:'',description:'',price:"",stock:"",supplier_id:""
  } 
  constructor(private console:ConsolesService,private game:GameService,private router:Router) { }

  ngOnInit(): void {
    this.console.show(parseInt(this.id)).subscribe(data=>{
      this.consoleform.setValue({
        name:data.console.name,
        description:data.console.description,
        price:Number(data.console.console_inventory.price),
        stock:data.console.console_inventory.stock,
        supplier_id:data.console.supplier_id,
      });
    },(error)=>{
      this.router.navigate(['/not-found']);
    });
    this.game.suppliers().subscribe((response)=>{
      this.suppliers = response;
    });
  }

  update():void{
    this.console.update(parseInt(this.id),{
      name: this.consoleform.value.name || '',
      description: this.consoleform.value.description || '',
      price: Number(this.consoleform.value.price) || 0,
      stock: Number(this.consoleform.value.stock) || 0,
      supplier_id: Number(this.consoleform.value.supplier_id) || 0,
    }).subscribe((response)=>{
      this.router.navigate(['home/consoles']);
    },(error)=>{
      this.errors.name = error.error.errors.name;
      this.errors.description = error.error.errors.description;
      this.errors.price = error.error.errors.price;
      this.errors.stock = error.error.errors.stock;
      this.errors.supplier_id = error.error.errors.supplier_id;

    });
  }

  

}
