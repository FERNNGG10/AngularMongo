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
import { DlcDataInterface, DlcsIndexInterface } from '../../interfaces/DlcsIndexInterface.interfaces';
import { DlcService } from '../../services/dlc.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dlcs',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './dlcs.component.html',
  styleUrl: './dlcs.component.css'
})
export class DlcsComponent implements OnInit{

  public dlcs:DlcsIndexInterface={dlcs:[]};
  public dlcdata:DlcDataInterface={name:'',game_id:0};
  public juegos:JUEGOS={games:[]};
  public msg='';
  rol=0;
  public id=0;
  public errors={
    name:'',game_id:''
  }
  constructor(private dlc:DlcService,private auth:AuthService) { }

  dlcform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    game_id: new FormControl(1, [Validators.required]),
  });

  get name() { return this.dlcform.get('name'); }
  get game_id() { return this.dlcform.get('game_id'); }

  ngOnInit(): void {
    this.dlc.index().subscribe((response)=>{
      this.dlcs = response;
    });
    this.dlc.games().subscribe((response)=>{
      this.juegos = response;
    });
    this.auth.rolid().subscribe((response)=>{
      this.rol = response
    });
  }

  store():void{
    this.dlcdata = {
      name: this.dlcform.value.name || '',
      game_id: Number(this.dlcform.value.game_id) || 0,
    };
    this.dlc.store(this.dlcdata).subscribe((response)=>{
      this.msg = response.msg;
      console.log(response.msg);
      console.log(response);
      setTimeout(()=>{this.msg=''},3000);
      this.dlcform.reset();
      this.dlc.index().subscribe((response)=>{
        this.dlcs = response;
      });
    },(error)=>{
      console.log(error.error);
      console.log(error.error.errors);
      this.errors.name = error.error.errors.name;
      this.errors.game_id = error.error.errors.game_id;
    })
  }

  deleteid(id:number):void{
    this.id = id;
  }

  delete():void{
    this.dlc.delete(this.id).subscribe((response)=>{
      this.msg = response.msg;
      this.id = 0;
      setTimeout(()=>{this.msg=''},3000);
      this.dlc.index().subscribe((response)=>{
        this.dlcs = response;
      });
    });
  }

}
