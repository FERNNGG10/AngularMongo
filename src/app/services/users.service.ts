import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolesS, Root, UserDataInterface, UserIndexInterface } from '../interfaces/UsersIndexInterface.interface';
import { environment } from '../../environments/environment.development';
import { UserDataUpdateInterface, UserShowInterface } from '../interfaces/UserShowInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  index():Observable<UserIndexInterface>{
    return this.http.get<UserIndexInterface>(`${environment.UrlUsers}index`);
  }

  store(data:UserDataInterface):Observable<Root>{
    return this.http.post<Root>(`${environment.UrlUsers}store`,data);
  }

  delete(id:number):Observable<Root>{
    return this.http.delete<Root>(`${environment.UrlUsers}destroy/${id}`);
  }

  show(id: number): Observable<UserShowInterface> {
    return this.http.get<UserShowInterface>(`${environment.UrlUsers}show/${id}`);
  }

  update(id:number,data:UserDataUpdateInterface):Observable<Root>{
    return this.http.put<Root>(`${environment.UrlUsers}update/${id}`,data);
  }

  roles():Observable<RolesS>{
    return this.http.get<RolesS>(`${environment.UrlUsers}roles`);
  }
}
