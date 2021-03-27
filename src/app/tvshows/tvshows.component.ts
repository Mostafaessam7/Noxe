import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss']
})
export class TvshowsComponent implements OnInit {
  notice:boolean=true
  disablePrev:boolean=false
  disableNext:boolean=true
page:number=0
type:any=""
allData:any[]=[]
tvShows:any[]=[]
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
      _DataService.getData("tv",this.type,this.page).subscribe((response)=>{
        this.notice=response.success 
        Spinner.hide()
        this.allData=response.results.filter((item:any)=>{
          return item.poster_path!=null
        })
        this.tvShows=this.allData    
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
