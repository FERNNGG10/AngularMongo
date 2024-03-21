import { Injectable } from '@angular/core';
import { CanActivateFn ,CanActivate, Router, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class activeGuard implements CanActivate{
  constructor(private auth:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.checkstatus().pipe(
      map(response => {
        if (response === 1) {
          return true;
        }
       
          this.router.navigate(['/login']);
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
