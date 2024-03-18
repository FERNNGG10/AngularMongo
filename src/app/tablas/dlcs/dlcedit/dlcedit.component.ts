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
import { JUEGOS, Review, ReviewDataInterface, ReviewsIndexInterface } from '../../../interfaces/ReviewsIndexInterface.interface';
import { ReviewsService } from '../../../services/reviews.service';
import { DlcDataInterface, DlcsIndexInterface } from '../../../interfaces/DlcsIndexInterface.interfaces';
import { DlcService } from '../../../services/dlc.service';

@Component({
  selector: 'app-dlcedit',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './dlcedit.component.html',
  styleUrl: './dlcedit.component.css'
})
export class DlceditComponent implements OnInit {
  @Input('id') id!: string
  public juegos:JUEGOS={games:[]};
  public errors={
    name:'',game_id:''
  }
  constructor(private dlc:DlcService,private router:Router) { }

  dlcform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    game_id: new FormControl(1, [Validators.required]),
  });

  ngOnInit(): void {
    this.dlc.games().subscribe((response)=>{
      this.juegos = response;
    });

    this.dlc.show(Number(this.id)).subscribe((response)=>{
      this.dlcform.patchValue({
        name: response.dlc.name,
        game_id: response.dlc.game_id
      });
    },(error)=>{
      this.router.navigate(['/not-found']);
    });

  }

  update():void{
    this.dlc.update(Number(this.id),{
      name: this.dlcform.value.name || '',
      game_id: Number(this.dlcform.value.game_id) || 0,
    }).subscribe((response)=>{
      console.log(response);
      this.router.navigate(['home/dlcs'])
    },(error)=>{
      this.errors.name = error.error.errors.name;
      this.errors.game_id = error.error.errors.game_id;
    }
    );
  }
}
