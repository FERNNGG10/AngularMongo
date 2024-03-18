import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeveloperDataInterface, DeveloperIndexInterface, Root } from '../interfaces/DeveloperIndexInterface.interface';
import { environment } from '../../environments/environment.development';
import { DeveloperShowInterface } from '../interfaces/DeveloperShowIneterface.interface';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  constructor(private http:HttpClient) { }

  index():Observable<DeveloperIndexInterface>{
    return this.http.get<DeveloperIndexInterface>(`${environment.UrlDevelopers}index`);
  }

  store(data:DeveloperDataInterface):Observable<Root>{
    return this.http.post<Root>(`${environment.UrlDevelopers}store`,data);
  }

  delete(id:number):Observable<Root>{
    return this.http.delete<Root>(`${environment.UrlDevelopers}destroy/${id}`);
  }

  show(id:number):Observable<DeveloperShowInterface>{
    return this.http.get<DeveloperShowInterface>(`${environment.UrlDevelopers}show/${id}`);
  }

  update(id:number,data:DeveloperDataInterface):Observable<Root>{
    return this.http.put<Root>(`${environment.UrlDevelopers}update/${id}`,data);
  }
}
