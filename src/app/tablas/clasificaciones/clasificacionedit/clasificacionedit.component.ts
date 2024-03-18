import { ImplicitReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { GameDataInterface, GameIndexInterface } from '../../../interfaces/GameIndexInterface.interface';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FormControl, FormsModule, ReactiveFormsModule ,FormGroup,Validators } from '@angular/forms';
import { CategoryIndexInterface } from '../../../interfaces/CategoryIndexInterface.interface';
import { SupplierIndexInterface } from '../../../interfaces/SupplierIndexInterface.interface';
import { ClassificationDataInterface, ClassificationIndexInterface } from '../../../interfaces/ClassificationIndexInterface.interface';
import { DeveloperIndexInterface } from '../../../interfaces/DeveloperIndexInterface.interface';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { ClassificationsService } from '../../../services/classifications.service';

@Component({
  selector: 'app-clasificacionedit',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './clasificacionedit.component.html',
  styleUrl: './clasificacionedit.component.css'
})
export class ClasificacioneditComponent implements OnInit{
  @Input('id') id!: string
  public errors={
    classification:''
  }
  constructor(private classificatio:ClassificationsService,private router:Router) { }

  classificationform = new FormGroup({
    classification: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
  });

  ngOnInit(): void {
    this.classificatio.show(Number(this.id)).subscribe((response)=>{
      this.classificationform.setValue({
        classification: response.classification.classification
      });
    },(error)=>{
      this.router.navigate(['/not-found']);
    });
  }

  update():void{
    this.classificatio.update(Number(this.id),{
      classification: this.classificationform.value.classification || ''
    }).subscribe((response)=>{
      console.log(response);
      this.router.navigate(['home/clasificaciones'])
    },(error)=>{
      this.errors.classification = error.error.errors.classification;
    }
    );
  }

}
