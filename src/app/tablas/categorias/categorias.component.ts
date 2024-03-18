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
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit{

  public categories:CategoryIndexInterface={categories:[]};
  public categorydata:CategoryDataInterface={category:''};
  msg='';
  id=0;
  rol=0;
  constructor(private categoryService:CategoriesService,private auth:AuthService) { }

  ngOnInit(): void {
    this.categoryService.index().subscribe((response)=>{
      this.categories = response;
    });
   this.auth.rolid().subscribe((response)=>{
      this.rol = response
    });
  }

  categoryform = new FormGroup({
    category: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
  });

  get categorie() { return this.categoryform.get('category'); }

  deleteid(id:number):void{
    this.id = id;
    console.log(this.id);
  }

  store():void{
    this.categorydata = {
      category: this.categoryform.value.category || '',
    };

    this.categoryService.store(this.categorydata).subscribe((response)=>{
      console.log(response.msg);
      this.msg = response.msg;
      setTimeout(()=>{this.msg=''},3000);
      this.categoryform.reset();
      this.categoryService.index().subscribe((response)=>{
        this.categories = response;
      });
      
    });
  }

  delete():void{
    this.categoryService.delete(this.id).subscribe((response)=>{
      console.log(response.msg);
      this.msg = response.msg;
      this.id = 0;
      setTimeout(()=>{this.msg=''},3000);
      this.categoryService.index().subscribe((response)=>{
        this.categories = response;
      });
    });
  }

}
