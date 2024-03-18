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

@Component({
  selector: 'app-comentarioedit',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './comentarioedit.component.html',
  styleUrl: './comentarioedit.component.css'
})
export class ComentarioeditComponent implements OnInit{
  @Input('id') id!: string
  public juegos:JUEGOS={games:[]};
  public errors={
    game_id:'',comment:''
  }
  constructor(private review:ReviewsService,private router:Router) { }
  reviewform = new FormGroup({
    game_id: new FormControl(1, [Validators.required]),
    comment: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(100)]),
  });

  ngOnInit(): void {
    this.review.games().subscribe((response)=>{
      this.juegos = response;
    });
    this.review.show(Number(this.id)).subscribe((response)=>{
      this.reviewform.patchValue({
        game_id: response.review.game_id,
        comment: response.review.comment
      });
    },(error)=>{
      this.router.navigate(['/not-found']);
    });
  }

  update():void{
    this.review.update(Number(this.id),{
      game_id: Number(this.reviewform.value.game_id) ,
      comment: this.reviewform.value.comment || '',
    }).subscribe((response)=>{
      console.log(response);
      this.router.navigate(['home/comentarios'])
    },(error)=>{
      this.errors.comment = error.error.errors.comment;
      this.errors.game_id = error.error.errors.game_id;
    }
    );
  }


}
