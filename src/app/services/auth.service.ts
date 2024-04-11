import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoginDataInterface } from '../interfaces/LoginDataInterface.interface';
import { RegisterDataInterface,RegisterResponseInterface } from '../interfaces/RegisterData.interface';
import { CodeResponseInterface } from '../interfaces/CodeResponseInterface.interface';
import { LoginResponseInterface } from '../interfaces/LoginResponse.interface';
import { MeInterface } from '../interfaces/Me.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private otro="http://192.168.117.161:8000";
  //private otro="http://127.0.0.1:8000";
  constructor(private http:HttpClient) { 

  }
  isauth(): Observable<HttpResponse<any>>{
      return this.http.get<any>(`${environment.UrlAuth}me`,{observe:'response'})
  }

  register(data:RegisterDataInterface):Observable<RegisterResponseInterface>{
    return this.http.post<RegisterResponseInterface>(`${environment.UrlAuth}register`,data)
  }

  login(data:LoginDataInterface):Observable<CodeResponseInterface>{
    return this.http.post<CodeResponseInterface>(`${environment.UrlAuth}login`,data)
  }

  verify_code(data:LoginDataInterface):Observable<LoginResponseInterface>{
    return this.http.post<LoginResponseInterface>(`${environment.UrlAuth}login`,data)
  }

  checkrol():Observable<MeInterface>{
    return this.http.get<MeInterface>(`${environment.UrlAuth}me`)
  }

  rolid():Observable<any>{
    return this.http.get<any>(`${environment.UrlAuth}rolid`)
  }

  actividades():Observable<any>{
    return this.http.get<any>(`${this.otro}/api/logs`)
  }

  checkstatus():Observable<any>{
    return this.http.get<any>(`${environment.UrlAuth}status`)
  }

  logout():Observable<any>{
    return this.http.post(`${environment.UrlAuth}logout`,{})
  }
}
