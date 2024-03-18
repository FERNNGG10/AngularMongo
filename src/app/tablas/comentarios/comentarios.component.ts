import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameDataInterface, GameIndexInterface } from '../../interfaces/GameIndexInterface.interface';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormControl, FormsModule, ReactiveFormsModule ,FormGroup,Validators } from '@angular/forms';
import { CategoryIndexInterface } from '../../interfaces/CategoryIndexInterface.interface';
import { SupplierIndexInterface } from '../../interfaces/SupplierIndexInterface.interface';
import { ClassificationIndexInterface } from '../../interfaces/ClassificationIndexInterface.interface';
import { DeveloperIndexInterface } from '../../interfaces/DeveloperIndexInterface.interface';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { JUEGOS, Review, ReviewDataInterface, ReviewsIndexInterface } from '../../interfaces/ReviewsIndexInterface.interface';
import { ReviewsService } from '../../services/reviews.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements OnInit{
  public reviews:ReviewsIndexInterface={reviews:[]};
  public reviewdata:ReviewDataInterface={game_id:0,comment:''};
  public juegos:JUEGOS={games:[]};
  public msg='';
  rol=0;
  public id=0;
  public errors={
    game_id:'',comment:''
  }
  constructor(private review:ReviewsService,private auth:AuthService) { }

  reviewform = new FormGroup({
    game_id: new FormControl(1, [Validators.required]),
    comment: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(100)]),
  });

  get game_id() { return this.reviewform.get('game_id'); }
  get comment() { return this.reviewform.get('comment'); }

  ngOnInit(): void {
    this.review.index().subscribe((response)=>{
      this.reviews = response;
    });
    this.review.games().subscribe((response)=>{
      this.juegos = response;
    });
    this.auth.rolid().subscribe((response)=>{
      this.rol = response
    });
  }
  store():void{
    this.reviewdata = {
      game_id: Number(this.reviewform.value.game_id) || 0,
      comment: this.reviewform.value.comment || '',
    };
    this.review.store(this.reviewdata).subscribe((response)=>{
      this.msg = response.msg;
      console.log(response.msg);
      console.log(response);
      setTimeout(()=>{this.msg=''},3000);
      this.reviewform.reset();
      this.review.index().subscribe((response)=>{
        this.reviews = response;
      });
    },(error)=>{
      this.errors.game_id = error.error.errors.game_id;
      this.errors.comment = error.error.errors.comment;
    });
  }

  deleteid(id:number):void{
    this.id = id;
  }

  delete():void{
    this.review.delete(this.id).subscribe((response)=>{
      this.msg = response.msg;
      this.id = 0;
      setTimeout(()=>{this.msg=''},3000);
      this.review.index().subscribe((response)=>{
        this.reviews = response;
      });
    });
  }

}
