import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JUEGOS, ReviewDataInterface, ReviewsIndexInterface } from '../interfaces/ReviewsIndexInterface.interface';
import { environment } from '../../environments/environment.development';
import { Root } from '../interfaces/ConsoleIndexInterface.interface';
import { ReviewShowInterface } from '../interfaces/ReviewShowInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http:HttpClient) { }

  index():Observable<ReviewsIndexInterface>{
    return this.http.get<ReviewsIndexInterface>(`${environment.UrlReviews}index`);
  }

  store(data:ReviewDataInterface):Observable<Root>{
    return this.http.post<Root>(`${environment.UrlReviews}store`,data);
  }

  delete(id:number):Observable<Root>{
    return this.http.delete<Root>(`${environment.UrlReviews}destroy/${id}`);
  }

  games():Observable<JUEGOS>{
    return this.http.get<JUEGOS>(`${environment.UrlReviews}games`);
  }

  show(id:number):Observable<ReviewShowInterface>{
    return this.http.get<ReviewShowInterface>(`${environment.UrlReviews}show/${id}`);
  }

  update(id:number,data:ReviewDataInterface):Observable<Root>{
    return this.http.put<Root>(`${environment.UrlReviews}update/${id}`,data);
  }
}
