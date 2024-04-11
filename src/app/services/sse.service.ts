import { Injectable, NgZone } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SSEService {

  constructor(private zone:NgZone) { }

  getsse(url:string):Observable<any>{
    return new Observable(observer=>{
      const eventsource = new EventSource(url)
      console.log(eventsource)
      eventsource.onmessage = event=>{
        this.zone.run(()=>{
         
          observer.next(event)
        })
      }
      eventsource.onerror = error =>{
        this.zone.run(()=>{
          
          observer.error(error)
        })
      }
      return () =>{
        eventsource.close()
      }
    })
  }

  

  
}
