import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dlc, DlcDataInterface, DlcsIndexInterface, JUEGOS, Root } from '../interfaces/DlcsIndexInterface.interfaces';
import { environment } from '../../environments/environment.development';
import { DlcShowInterface } from '../interfaces/DlcShowInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class DlcService {

  constructor(private http:HttpClient) { }

  index():Observable<DlcsIndexInterface>{
    return this.http.get<DlcsIndexInterface>(`${environment.UrlDlcs}index`);
  }

  store(data:DlcDataInterface):Observable<Root>{
    return this.http.post<Root>(`${environment.UrlDlcs}store`,data);
  }

  delete(id:number):Observable<Root>{
    return this.http.delete<Root>(`${environment.UrlDlcs}destroy/${id}`);
  }

  games():Observable<JUEGOS>{
    return this.http.get<JUEGOS>(`${environment.UrlDlcs}games`);
  }

  show(id:number):Observable<DlcShowInterface>{
    return this.http.get<DlcShowInterface>(`${environment.UrlDlcs}show/${id}`);
  }

  update(id:number,data:DlcDataInterface):Observable<Root>{
    return this.http.put<Root>(`${environment.UrlDlcs}update/${id}`,data);
  }
}
