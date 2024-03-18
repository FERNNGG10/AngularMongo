import { Component, Input, OnInit } from '@angular/core';
import { ConsolesService } from '../../../services/consoles.service';
import { ConsoleDataInterface, ConsoleIndexInterface } from '../../../interfaces/ConsoleIndexInterface.interface';
import { Route, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { SupplierIndexInterface } from '../../../interfaces/SupplierIndexInterface.interface';
import { GameService } from '../../../services/game.service';
import { CategoryDataInterface, CategoryIndexInterface } from '../../../interfaces/CategoryIndexInterface.interface';
import { CategoriesService } from '../../../services/categories.service';
import { PaymentDataInterface, PaymenthIndexInterface } from '../../../interfaces/PaymenthIndexInterface.interface';
import { MetodopagoService } from '../../../services/metodopago.service';

@Component({
  selector: 'app-metodopagoedit',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './metodopagoedit.component.html',
  styleUrl: './metodopagoedit.component.css'
})
export class MetodopagoeditComponent implements OnInit{
  @Input('id') id!: string
  errors={
    method:'',
  }
  constructor(private metod:MetodopagoService,private router:Router) { }

  metodoform = new FormGroup({
    method: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
  });

  ngOnInit(): void {
    this.metod.show(Number(this.id)).subscribe((response)=>{
      this.metodoform.patchValue({
        method: response.payment_method.method
      });
    },(error)=>{
      this.router.navigate(['/not-found']);
    });
  }


  update():void{
    this.metod.update(Number(this.id),{
      method: this.metodoform.value.method || ''
    }).subscribe((response)=>{
      console.log(response);
      this.router.navigate(['home/metodopago'])
    },(error)=>{
      this.errors.method = error.error.errors.method;
    }
    );
  }


}
