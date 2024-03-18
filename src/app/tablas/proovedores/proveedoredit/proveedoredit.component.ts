import { ImplicitReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { GameDataInterface, GameIndexInterface } from '../../../interfaces/GameIndexInterface.interface';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FormControl, FormsModule, ReactiveFormsModule ,FormGroup,Validators } from '@angular/forms';
import { CategoryIndexInterface } from '../../../interfaces/CategoryIndexInterface.interface';
import { SupplierDataInterface, SupplierIndexInterface } from '../../../interfaces/SupplierIndexInterface.interface';
import { ClassificationIndexInterface } from '../../../interfaces/ClassificationIndexInterface.interface';
import { DeveloperDataInterface, DeveloperIndexInterface } from '../../../interfaces/DeveloperIndexInterface.interface';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { DevelopersService } from '../../../services/developers.service';
import { SuppliersService } from '../../../services/suppliers.service';


@Component({
  selector: 'app-proveedoredit',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './proveedoredit.component.html',
  styleUrl: './proveedoredit.component.css'
})
export class ProveedoreditComponent implements OnInit{

  @Input('id') id!: string
  constructor(private supplier:SuppliersService,private router:Router) { }

  supplierform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
  });
  public errors={
    name:'',email:'',phone:''
  }
  ngOnInit(): void {
    this.supplier.show(Number(this.id)).subscribe((response)=>{
      this.supplierform.patchValue({
        name: response.supplier.name,
        email: response.supplier.email,
        phone: response.supplier.phone
      });
    },(error)=>{
      console.log(error);
      this.router.navigate(['/not-found']);
    });
  }

  update():void{
    this.supplier.update(Number(this.id),{
      name: this.supplierform.value.name || '',
      email: this.supplierform.value.email || '',
      phone: this.supplierform.value.phone || ''
     
    }).subscribe((response)=>{
      console.log(response);
      this.router.navigate(['home/proovedores'])
    },(error)=>{
      console.log(error.error);
      this.errors.name = error.error.errors.name;
      this.errors.email = error.error.errors.email;
      this.errors.phone = error.error.errors.phone;
    }
    );
  }



}
