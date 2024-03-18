import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsoleIndexInterface ,ConsoleDataInterface, Root} from '../interfaces/ConsoleIndexInterface.interface';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { SuppliersSelectInterface } from '../interfaces/GameIndexInterface.interface';
import { ConsoleShowInterface } from '../interfaces/ConsoleShowInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsolesService {

  constructor(private http:HttpClient) { }

  index():Observable<ConsoleIndexInterface>{
    return this.http.get<ConsoleIndexInterface>(`${environment.UrlConsoles}index`);
  }
  suppliers():Observable<SuppliersSelectInterface>{
    return this.http.get<SuppliersSelectInterface>(`${environment.UrlGames}suppliers`);
  }

  store(data:ConsoleDataInterface):Observable<Root>{
    return this.http.post<Root>(`${environment.UrlConsoles}store`,data);
  }

  delete(id:number):Observable<Root>{
    return this.http.delete<Root>(`${environment.UrlConsoles}destroy/${id}`);
  }

  show(id:number):Observable<ConsoleShowInterface>{
    return this.http.get<ConsoleShowInterface>(`${environment.UrlConsoles}show/${id}`);
  }

  update(id:number,data:ConsoleDataInterface):Observable<Root>{
    return this.http.put<Root>(`${environment.UrlConsoles}update/${id}`,data);
  }

}
