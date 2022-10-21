import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate,CanLoad {

  constructor(private userService:UserService,private router:Router){
  }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {


  return this.userService.isAuthenticated()

  // if(!this.userService.isAuthenticated()){
  //   console.log("hola canactivate dentro del activate");
  // }
  //   console.log("hola canactivate fuera del activate");
  //   return true
}
canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

  return this.userService.isAuthenticated()

  // if(!this.userService.isAuthenticated()){
  //   console.log("hola canload dentro del activate");
  
  // } 
  // console.log("hola canload fuera del activate");
  // return true
  }
}
