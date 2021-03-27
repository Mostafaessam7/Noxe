import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLogin= new BehaviorSubject(false)
  canActivate():boolean|Observable<any>{
    let token=localStorage.getItem("token");
    if (token){
      this.isLogin.next(true)
      return true
    }
    this._Router.navigateByUrl("/login")
    this.isLogin.next(false)
    return false
  }
  constructor(private _Router:Router) { }
}
