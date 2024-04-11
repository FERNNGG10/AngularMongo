import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink,RouterLinkActive,Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public rol:number = 0;
  constructor(private router:Router,private auth:AuthService){
    this.router.events.subscribe((event)=>{
      if(event.constructor.name == 'NavigationEnd'){
        this.auth.checkrol().subscribe((response)=>{
          this.rol = response.rol_id;
          console.log(response.rol_id);
          console.log(this.rol);
        },(error)=>{
          console.error(error);
        })
      }
    })
  }
  ngOnInit(): void {
    this.auth.checkrol().subscribe((response)=>{
      this.rol = response.rol_id;
      console.log(response.rol_id);
      console.log(this.rol);
    },(error)=>{
      console.error(error);
    })
  }
  
  logout():void{
    this.auth.logout().subscribe(()=>{
      localStorage.removeItem('token')
    },(erro)=>{
      console.error(erro)
    })
  }

}
