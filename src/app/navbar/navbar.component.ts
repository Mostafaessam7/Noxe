import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import {AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 showMenuItem:any; 
 target:any=""
  constructor(private _Router:Router, private _AuthGuardService:AuthGuardService) { 
    this._AuthGuardService.isLogin.subscribe((flag)=>{
      this.showMenuItem=flag
    })
      
    
  }
 
logout(){
  localStorage.removeItem("token")
  this._AuthGuardService.isLogin.next(false)
  this._Router.navigateByUrl("/login")
}
targetInfo(eventInfo:any){
  this.target=eventInfo.target.value
}
  ngOnInit(): void {
   
  }

}
