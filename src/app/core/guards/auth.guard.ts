import { Injectable } from '@angular/core';
import { CanActivateFn ,CanActivate, Router, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate{
  constructor(private auth:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isauth().pipe(
      map(response => {
        if (response.status === 200) {
          return true;
        } else if(response.status === 401){
          this.router.navigate(['/login']);
          return false;
        }
        return false;
      }),
      catchError(error => {
        console.error(error);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
  
}