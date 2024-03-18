import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesSelectInterface, ClassificationsSelectInterface, DevelopersSelectInterface, GameDataInterface, GameIndexInterface, Root, SuppliersSelectInterface } from '../interfaces/GameIndexInterface.interface';
import { environment } from '../../environments/environment.development';
import { GameShowInterface } from '../interfaces/GameShowInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http:HttpClient) { }

  index():Observable<GameIndexInterface>{
    return this.http.get<GameIndexInterface>(`${environment.UrlGames}index`);
  }

  store(data:GameDataInterface):Observable<Root>{
    return this.http.post<Root>(`${environment.UrlGames}store`,data);
  }

  show(id:number):Observable<GameShowInterface>{
    return this.http.get<GameShowInterface>(`${environment.UrlGames}show/${id}`);
  }

  update(id:number,data:GameDataInterface):Observable<Root>{
    return this.http.put<Root>(`${environment.UrlGames}update/${id}`,data);
  }

  delete(id:number):Observable<Root>{
    return this.http.delete<Root>(`${environment.UrlGames}destroy/${id}`);
  }

  categories():Observable<CategoriesSelectInterface>{
    return this.http.get<CategoriesSelectInterface>(`${environment.UrlGames}categories`);
  }

  suppliers():Observable<SuppliersSelectInterface>{
    return this.http.get<SuppliersSelectInterface>(`${environment.UrlGames}suppliers`);
  }

  classifications():Observable<ClassificationsSelectInterface>{
    return this.http.get<ClassificationsSelectInterface>(`${environment.UrlGames}classifications`);
  }

  developers():Observable<DevelopersSelectInterface>{
    return this.http.get<DevelopersSelectInterface>(`${environment.UrlGames}developers`);
  }
}
