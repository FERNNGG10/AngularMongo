import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Root, SupplierDataInterface, SupplierIndexInterface } from '../interfaces/SupplierIndexInterface.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { SupplierShowInterface } from '../interfaces/SupplierShowInterface.inetrface';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http:HttpClient) { }

  index():Observable<SupplierIndexInterface>{
    return this.http.get<SupplierIndexInterface>(`${environment.UrlSuppliers}index`);
  }

  store(data:SupplierDataInterface):Observable<Root>{
    return this.http.post<Root>(`${environment.UrlSuppliers}store`,data);
  }

  delete(id:number):Observable<Root>{
    return this.http.delete<Root>(`${environment.UrlSuppliers}destroy/${id}`);
  }

  show(id:number):Observable<SupplierShowInterface>{
    return this.http.get<SupplierShowInterface>(`${environment.UrlSuppliers}show/${id}`);
  }

  update(id:number,data:SupplierDataInterface):Observable<Root>{
    return this.http.put<Root>(`${environment.UrlSuppliers}update/${id}`,data);
  }

  
}
