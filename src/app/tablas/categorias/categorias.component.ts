import { Component, OnInit } from '@angular/core';
import { ConsolesService } from '../../services/consoles.service';
import {
  ConsoleDataInterface,
  ConsoleIndexInterface,
} from '../../interfaces/ConsoleIndexInterface.interface';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { SupplierIndexInterface } from '../../interfaces/SupplierIndexInterface.interface';
import { GameService } from '../../services/game.service';
import {
  CategoryDataInterface,
  CategoryIndexInterface,
} from '../../interfaces/CategoryIndexInterface.interface';
import { CategoriesService } from '../../services/categories.service';
import { AuthService } from '../../services/auth.service';
import { SSEService } from '../../services/sse.service';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent implements OnInit {
  public categories: CategoryIndexInterface = { categories: [] };
  public categorydata: CategoryDataInterface = { category: '' };
  msg = '';
  id = 0;
  ssee = '';
  rol = 0;
  constructor(
    private categoryService: CategoriesService,
    private auth: AuthService,
    private ngZone:NgZone
  ) {}

  ngOnInit(): void {
    this.categoryService.index().subscribe((response) => {
      this.categories = response;
    });
    this.auth.rolid().subscribe((response) => {
      this.rol = response;
    });
    this.startSSE()
  }
  startSSE(): void{
    
      const eventSource = new EventSource('http://192.168.117.161:8000/api/sse');

      eventSource.onmessage = (event) => {
        console.log(event.data);
        
        if(event.data == "true") {
          console.log('Se ha actualizado la tabla')
          this.ssee='Se ha actualizado la tabla';
          
          
          
          this.ngZone.run(() => {
            this.categoryService.index().subscribe((respuesta) => {
              this.categories = respuesta;
              setTimeout(() => {
                this.ssee=''
              }, 2000);
            },(error)=>{
              console.log(error)
            });
          });
          //eventSource.close()
        }
  
      };
    
  }

  categoryform = new FormGroup({
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
  });

  get categorie() {
    return this.categoryform.get('category');
  }

  deleteid(id: number): void {
    this.id = id;
    console.log(this.id);
  }

  updatecategories(): void {
    this.categoryService.index().subscribe((response) => {
      this.categories = response;
    });
  }

  store(): void {
    this.categorydata = {
      category: this.categoryform.value.category || '',
    };

    this.categoryService.store(this.categorydata).subscribe((response) => {
      console.log(response.msg);
      this.msg = response.msg;
      setTimeout(() => {
        this.msg = '';
      }, 3000);
      this.categoryform.reset();
      this.categoryService.index().subscribe((response) => {
        this.categories = response;
      });
    //   this.sseService.getsse('http://127.0.0.1:8000/api/sse').subscribe({
    //     next:(event)=>{
    //       console.log(event)
    //     },
    //     error:(error)=>{
    //       console.error(error)
    //     }
    //  })
    });
  }

  delete(): void {
    this.categoryService.delete(this.id).subscribe((response) => {
      console.log(response.msg);
      this.msg = response.msg;
      this.id = 0;
      setTimeout(() => {
        this.msg = '';
      }, 3000);
      this.categoryService.index().subscribe((response) => {
        this.categories = response;
      });
    });
  }
}
