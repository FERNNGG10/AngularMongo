import { Component, Input, OnInit } from '@angular/core';
import { ConsolesService } from '../../../services/consoles.service';
import { ConsoleDataInterface, ConsoleIndexInterface } from '../../../interfaces/ConsoleIndexInterface.interface';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { SupplierIndexInterface } from '../../../interfaces/SupplierIndexInterface.interface';
import { GameService } from '../../../services/game.service';
import { CategoryDataInterface, CategoryIndexInterface } from '../../../interfaces/CategoryIndexInterface.interface';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-categoriaedit',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './categoriaedit.component.html',
  styleUrl: './categoriaedit.component.css'
})
export class CategoriaeditComponent implements OnInit{

@Input('id') id!: string
categoryform = new FormGroup({
  category: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
});
public errors={
  category:''
}
constructor(private categoryService:CategoriesService,private router:Router) { }

ngOnInit(): void {
  this.categoryService.show(parseInt(this.id)).subscribe(data=>{
    this.categoryform.setValue({
      category:data.category.category,
    });
  },(error)=>{
    console.log(error);
    this.router.navigate(['/not-found']);
  });}

update():void{
  this.categoryService.update(parseInt(this.id),{
    category: this.categoryform.value.category || '',
  }).subscribe((response)=>{
    this.router.navigate(['home/categorias']);
  },(error)=>{
    this.errors.category = error.error.errors.category;
  });
}

}
