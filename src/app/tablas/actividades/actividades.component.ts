import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [ModalComponent,FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent implements OnInit{

  data: any[] = [];

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
      this.auth.actividades().subscribe((response)=>{
        this.data = response;
      });
  }

  isArray(val: any): boolean {
    return Array.isArray(val);
  }
  
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

}
