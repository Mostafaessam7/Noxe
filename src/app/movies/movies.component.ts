import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  notice:boolean=true
  disablePrev:boolean=false
  disableNext:boolean=true
  type:any=""
  Movies:any[]=[]
  page:number=0;
    constructor(private _DataService:DataService, private _ActivatedRoute:ActivatedRoute, private Spinner:NgxSpinnerService) { 
      this._ActivatedRoute.params.subscribe(()=>{
        this.type=_ActivatedRoute.snapshot.paramMap.get("genre")
        this.page=Number(_ActivatedRoute.snapshot.paramMap.get("page"))
        if (this.page==1){
          this.disablePrev=false
        }
        else{
          this.disablePrev=true
        }
        Spinner.show()
        _DataService.getData("movie",this.type,this.page).subscribe((response)=>{
         Spinner.hide()
           this.notice=response.success 
          this.Movies=response.results.filter((item:any)=>{
            return item.poster_path!=null
          })
          
        })
      })
    }
    Next(){
        this.disablePrev=true
      if(this.page==1000||this.notice==false){
         this.disableNext=false
      }
      else{
        this.disableNext=true
   this.page=this.page+1
      }
    }
    Prev(){
      if(this.notice==false){
        this.disablePrev=false
     }
     else if(this.page==2){
      this.disablePrev=false
      this.page=this.page-1
     }
     else{
  this.page=this.page-1
     }    }
  ngOnInit(): void {
  }

}
