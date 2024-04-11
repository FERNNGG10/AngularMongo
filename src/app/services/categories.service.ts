import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDataInterface, CategoryIndexInterface, Root } from '../interfaces/CategoryIndexInterface.interface';
import { environment } from '../../environments/environment.development';
import { CategoryShowInterface } from '../interfaces/CategoryShowInterface.interface';
import { SSEService } from './sse.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  index():Observable<CategoryIndexInterface>{
    return this.http.get<CategoryIndexInterface>(`${environment.UrlCategories}index`);
  }

  store(data:CategoryDataInterface):Observable<Root>{
    return this.http.post<Root>(`${environment.UrlCategories}store`,data);
  }

  delete(id:number):Observable<Root>{
    return this.http.delete<Root>(`${environment.UrlCategories}destroy/${id}`);
  }

  show(id:number):Observable<CategoryShowInterface>{
    return this.http.get<CategoryShowInterface>(`${environment.UrlCategories}show/${id}`);
  }

  update(id:number,data:CategoryDataInterface):Observable<Root>{
    return this.http.put<Root>(`${environment.UrlCategories}update/${id}`,data);
  }

 
}
