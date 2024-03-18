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
import { GameShowInterface } from '../../../interfaces/GameShowInterface.interface';

@Component({
  selector: 'app-gameedit',
  standalone: true,
  imports:  [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './gameedit.component.html',
  styleUrl: './gameedit.component.css'
})
export class GameeditComponent implements OnInit{
@Input('id') id!: string

public categories:CategoryIndexInterface={categories:[]};
public suppliers:SupplierIndexInterface={suppliers:[]};
public classifications:ClassificationIndexInterface={classifications:[]};
public developers:DeveloperIndexInterface={developers:[]};

gameform = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
  description: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(50)]),
  price: new FormControl(0, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
  stock: new FormControl(0, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
  category_id: new FormControl(1, [Validators.required]),
  supplier_id: new FormControl(1, [Validators.required]),
  classification_id: new FormControl(1, [Validators.required]),
  developer_id: new FormControl(1, [Validators.required]),
});

errors ={
  name:'',
  description:'',
  price:'',
  stock:'',
  category_id:'',
  supplier_id:'',
  classification_id:'',
  developer_id:''
}
constructor(private game:GameService,private router:Router) { }

ngOnInit(): void {
  this.game.show(parseInt(this.id)).subscribe(data=>{
    this.gameform.setValue({
      name:data.game.name,
      description:data.game.description,
      price:Number(data.game.game_inventory.price),
      stock:data.game.game_inventory.stock,
      category_id:data.game.category_id,
      supplier_id:data.game.supplier_id,
      classification_id:data.game.classification_id,
      developer_id:data.game.developer_id
    })
    console.log(data)
    console.log(this.gameform.value)
  },(error)=>{
    this.router.navigate(['/not-found'])
  })

  this.game.categories().subscribe((response)=>{
    this.categories = response;
    console.log(this.categories);
  },(error)=>{
    console.log(error);
    console.log(error.error);
  });

  this.game.suppliers().subscribe((response)=>{
    this.suppliers = response;
    console.log(this.suppliers);
  },(error)=>{
    console.log(error);
    console.log(error.error);
  });

  this.game.classifications().subscribe((response)=>{
    this.classifications = response;
    console.log(this.classifications);
  },(error)=>{
    console.log(error);
    console.log(error.error);
  });

  this.game.developers().subscribe((response)=>{
    this.developers = response;
    console.log(this.developers);
  },(error)=>{
    console.log(error);
    console.log(error.error);
  });
  }

update():void{
  let data:GameDataInterface = {
    name:this.gameform.value.name || '',
    description:this.gameform.value.description|| '',
    price:this.gameform.value.price|| 0,
    stock:this.gameform.value.stock|| 0,
    category_id:this.gameform.value.category_id|| 0,
    supplier_id:this.gameform.value.supplier_id|| 0,
    classification_id:this.gameform.value.classification_id|| 0,
    developer_id:this.gameform.value.developer_id|| 0
  }
  this.game.update(parseInt(this.id),data).subscribe(data=>{
    console.log(data)
    this.router.navigate(['/home/games'])
  },(error)=>{
    console.log(error)
    this.errors.name = error.error.errors.name
    this.errors.description = error.error.errors.description
    this.errors.price = error.error.errors.price
    this.errors.stock = error.error.errors.stock
    this.errors.category_id = error.error.errors.category_id
    this.errors.supplier_id = error.error.errors.supplier_id
    this.errors.classification_id = error.error.errors.classification_id
    this.errors.developer_id = error.error.errors.developer_id

  })

}
}


