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
import { AuthService } from '../../services/auth.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-games',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit{

  public games : GameIndexInterface={games:[]};
  public categories:CategoryIndexInterface={categories:[]};
  public suppliers:SupplierIndexInterface={suppliers:[]};
  public classifications:ClassificationIndexInterface={classifications:[]};
  public developers:DeveloperIndexInterface={developers:[]};
  public gamedata:GameDataInterface={name:'',description:'',price:0,stock:0,category_id:0,supplier_id:0,classification_id:0,developer_id:0};
  public msg='';
  rol=0;
  public id=0;
  public errors={
    name:'',description:'',price:'',stock:'',category_id:'',supplier_id:'',classification_id:'',developer_id:''
  } 
  constructor(private game:GameService,private auth:AuthService) { }

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


    get name() { return this.gameform.get('name'); }
    get description() { return this.gameform.get('description'); }
    get price() { return this.gameform.get('price'); }
    get stock() { return this.gameform.get('stock'); }
    get category_id() { return this.gameform.get('category_id'); }
    get supplier_id() { return this.gameform.get('supplier_id'); }
    get classification_id() { return this.gameform.get('classification_id'); }
    get developer_id() { return this.gameform.get('developer_id'); }
    
   

    
  ngOnInit(): void {

    interval(5000).pipe(
      switchMap(()=>this.game.index())
    ).subscribe(
      (response)=>{this.games = response;},
      (error)=>{console.log(error);}
    )

    this.auth.rolid().subscribe((response)=>{
      this.rol = response
    });
    }

    store():void{
      this.gamedata = {
        name: this.gameform.value.name || '',
        description: this.gameform.value.description || '',
        price: Number(this.gameform.value.price) || 0,
        stock: Number(this.gameform.value.stock) || 0,
        category_id: Number(this.gameform.value.category_id) || 0,
        supplier_id: Number(this.gameform.value.supplier_id) || 0,
        classification_id: Number(this.gameform.value.classification_id) || 0,
        developer_id: Number(this.gameform.value.developer_id) || 0,
      };

      this.game.store(this.gamedata).subscribe((response)=>{
        console.log(response.msg);
        this.msg = response.msg;
        setTimeout(()=>{this.msg=''},3000);
        this.gameform.reset();
        this.game.index().subscribe((response)=>{
          this.games = response;
          console.log(this.games);
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
        this.errors.category_id = error.error.errors.category_id;
        this.errors.supplier_id = error.error.errors.supplier_id;
        this.errors.classification_id = error.error.errors.classification_id;
        this.errors.developer_id = error.error.errors.developer_id;
        
      });
    }

    deleteid(id:number):void{
      this.id = id;
      console.log(this.id);
    }

    delete():void{

      this.game.delete(this.id).subscribe((response)=>{
        console.log(response.msg);
        this.msg = response.msg;

        setTimeout(()=>{this.msg=''},3000);
        this.id = 0;
        this.game.index().subscribe((response)=>{
          this.games = response;
          console.log(this.games);
        },(error)=>{
          console.log(error);
          console.log(error.error);
        });
      },(error)=>{
        console.log(error.error);
        console.log(error.error.errors);
      });
    }

    funcion():void{
      
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



}
