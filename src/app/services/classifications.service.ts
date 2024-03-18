import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassificationDataInterface, ClassificationIndexInterface } from '../interfaces/ClassificationIndexInterface.interface';
import { environment } from '../../environments/environment.development';
import { Root } from '../interfaces/ConsoleIndexInterface.interface';
import { ClassificationShowInterface } from '../interfaces/ClassificationShowInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class ClassificationsService {

  constructor(private http:HttpClient) { }

  index():Observable<ClassificationIndexInterface>{
    return this.http.get<ClassificationIndexInterface>(`${environment.UrlClassifications}index`);
  }

  store(data:ClassificationDataInterface):Observable<Root>{
    return this.http.post<Root>(`${environment.UrlClassifications}store`,data);
  }

  delete(id:number):Observable<Root>{
    return this.http.delete<Root>(`${environment.UrlClassifications}destroy/${id}`);
  }

  show(id:number):Observable<ClassificationShowInterface>{
    return this.http.get<ClassificationShowInterface>(`${environment.UrlClassifications}show/${id}`);
  }

  update(id:number,data:ClassificationDataInterface):Observable<Root>{
    return this.http.put<Root>(`${environment.UrlClassifications}update/${id}`,data);
  }
}
