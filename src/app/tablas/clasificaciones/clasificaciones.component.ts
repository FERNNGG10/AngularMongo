import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameDataInterface, GameIndexInterface } from '../../interfaces/GameIndexInterface.interface';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormControl, FormsModule, ReactiveFormsModule ,FormGroup,Validators } from '@angular/forms';
import { CategoryIndexInterface } from '../../interfaces/CategoryIndexInterface.interface';
import { SupplierIndexInterface } from '../../interfaces/SupplierIndexInterface.interface';
import { ClassificationDataInterface, ClassificationIndexInterface } from '../../interfaces/ClassificationIndexInterface.interface';
import { DeveloperIndexInterface } from '../../interfaces/DeveloperIndexInterface.interface';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { ClassificationsService } from '../../services/classifications.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-clasificaciones',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './clasificaciones.component.html',
  styleUrl: './clasificaciones.component.css'
})
export class ClasificacionesComponent implements OnInit {

  public classifications:ClassificationIndexInterface={classifications:[]};
  public classificationdata:ClassificationDataInterface={classification:''};
  public msg='';  
  rol=0;
  public id=0;
  public errors={
    classification:''
  }
  constructor(private classificatio:ClassificationsService,private auth:AuthService) { }

  classificationform = new FormGroup({
    classification: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
  });

  get classification() { return this.classificationform.get('classification'); }

  ngOnInit(): void {
    this.classificatio.index().subscribe((response)=>{
      this.classifications = response;
    });
    this.auth.rolid().subscribe((response)=>{
      this.rol = response
    });
  }
  store():void{
    this.classificationdata = {
      classification: this.classificationform.value.classification || '',
    };
    this.classificatio.store(this.classificationdata).subscribe((response)=>{
      this.msg = response.msg;
      console.log(response.msg);
      console.log(response);
      setTimeout(()=>{this.msg=''},3000);
      this.classificationform.reset();
      this.classificatio.index().subscribe((response)=>{
        this.classifications = response;
      });
    },(error)=>{
      this.errors.classification = error.error.errors.classification;

    });
  }
  deleteid(id:number):void{
    this.id = id;
  }
  delete():void{
    this.classificatio.delete(this.id).subscribe((response)=>{
      this.msg = response.msg;
      this.id = 0;
      this.classificatio.index().subscribe((response)=>{
        this.classifications = response;
      });
    });
  }
}
