import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router, private _Toastr:ToastrService,private Spinner:NgxSpinnerService) { }
  registerForm:FormGroup=new FormGroup({
    'first_name':new FormControl(null,[Validators.required,Validators.pattern(/^[A-Za-z]{3,10}$/)]),
    'last_name':new FormControl(null,[Validators.required,Validators.pattern(/^[A-Za-z]{3,10}$/)]),
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,[Validators.required,Validators.pattern(/[A-Za-z]{1,}[0-9]{1,}/),Validators.minLength(8)]),

  })
  register(){
if(this.registerForm.invalid){
  return
}
this.Spinner.show()
this._AuthService.registerData(this.registerForm.value).subscribe((data)=>{
   if(data.message=="success"){
     this._Toastr.success("Registered successfully")
     this.Spinner.hide()
     this._Router.navigateByUrl("/login")
   }
   else{
     this.Spinner.hide()
     this._Toastr.error(data.message)
   }
})
  }
  ngOnInit(): void {
  }

}
