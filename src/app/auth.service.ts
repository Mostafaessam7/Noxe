import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) {
   }
  registerData(registerValues:any):Observable<any>{
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signup`,registerValues)
  }
  loginData(loginValues:any):Observable<any>{
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signin`,loginValues)
  }
}
