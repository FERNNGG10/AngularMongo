import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentDataInterface, PaymenthIndexInterface, Root } from '../interfaces/PaymenthIndexInterface.interface';
import { environment } from '../../environments/environment.development';
import { PaymentMethodShowInterface } from '../interfaces/PaymethShowInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class MetodopagoService {

  constructor(private http:HttpClient) { }

  index():Observable<PaymenthIndexInterface>{
    return this.http.get<PaymenthIndexInterface>(`${environment.Urlpago}index`);
  }

  store(data:PaymentDataInterface):Observable<Root>{
    return this.http.post<Root>(`${environment.Urlpago}store`,data);
  }

  delete(id:number):Observable<Root>{
    return this.http.delete<Root>(`${environment.Urlpago}destroy/${id}`);
  }

  show(id:number):Observable<PaymentMethodShowInterface>{
    return this.http.get<PaymentMethodShowInterface>(`${environment.Urlpago}show/${id}`);
  }

  update(id:number,data:PaymentDataInterface):Observable<Root>{
    return this.http.put<Root>(`${environment.Urlpago}update/${id}`,data);
  }
}
