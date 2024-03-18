import { ImplicitReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { GameDataInterface, GameIndexInterface } from '../../../interfaces/GameIndexInterface.interface';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FormControl, FormsModule, ReactiveFormsModule ,FormGroup,Validators } from '@angular/forms';
import { CategoryIndexInterface } from '../../../interfaces/CategoryIndexInterface.interface';
import { SupplierIndexInterface } from '../../../interfaces/SupplierIndexInterface.interface';
import { ClassificationIndexInterface } from '../../../interfaces/ClassificationIndexInterface.interface';
import { DeveloperDataInterface, DeveloperIndexInterface } from '../../../interfaces/DeveloperIndexInterface.interface';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { DevelopersService } from '../../../services/developers.service';

@Component({
  selector: 'app-desarrolladoredit',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './desarrolladoredit.component.html',
  styleUrl: './desarrolladoredit.component.css'
})
export class DesarrolladoreditComponent implements OnInit{
  developerform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
  });
  public errors={
    name:'',email:'',phone:''
  }
  @Input('id') id!: string
  constructor(private developer:DevelopersService,private router:Router) { }

  ngOnInit(): void {
    this.developer.show(Number(this.id)).subscribe((response)=>{
      this.developerform.patchValue({
        name: response.developer.name,
        email: response.developer.email,
        phone: response.developer.phone
      });
    },(error)=>{
      this.router.navigate(['/not-found']);
    });
  }

  update():void{
    this.developer.update(Number(this.id),{
      name: this.developerform.value.name || '',
      email: this.developerform.value.email || '',
      phone: this.developerform.value.phone || ''
    }).subscribe((response)=>{
      console.log(response);
      this.router.navigate(['home/desarrolladores'])
    },(error)=>{
      console.log(error.error);
      this.errors.name = error.error.errors.name;
      this.errors.email = error.error.errors.email;
      this.errors.phone = error.error.errors.phone;
    }
    );
  }

}
