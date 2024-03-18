import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GadgetDataInterface, GadgetIndexInterface } from '../interfaces/GadgetIndexInterface.interface';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Root } from '../interfaces/ConsoleIndexInterface.interface';
import { GadgetShowInterface } from '../interfaces/GadgetShowInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class GadgetsService {

  constructor(private http:HttpClient) { }

  index():Observable<GadgetIndexInterface>{
    return this.http.get<GadgetIndexInterface>(`${environment.UrlGadgets}index`);
  }

  store(data:GadgetDataInterface):Observable<Root>{
    return this.http.post<Root>(`${environment.UrlGadgets}store`,data);
  }

  delete(id:number):Observable<Root>{
    return this.http.delete<Root>(`${environment.UrlGadgets}destroy/${id}`);
  }

  show(id:number):Observable<GadgetShowInterface>{
    return this.http.get<GadgetShowInterface>(`${environment.UrlGadgets}show/${id}`);
  }

  update(id:number,data:GadgetDataInterface):Observable<Root>{
    return this.http.put<Root>(`${environment.UrlGadgets}update/${id}`,data);
  }
}
