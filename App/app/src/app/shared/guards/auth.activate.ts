import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {  Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthActivate implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const { guest } = route.data;
    
    const token = localStorage.getItem('token');
    
    
    if (!token && guest == true) {
      return true
    }else if(token && guest == false){
      return true
    }else if(!token && guest == true){
       this.router.navigate(['/auth/login']);
      return true
    }
    return this.router.parseUrl('/not-found');
  }
}