import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  mediaType:any;
  media:string=""
  id:any;
  videoSrc:any=""
  itemDetails:any=[]
  Trailer:string=""
  showRow:boolean=false
  showGenre=false
    constructor(private _Router:Router, private _DataService:DataService, private _ActivatedRoute:ActivatedRoute, private sanitizer:DomSanitizer, private Spinner:NgxSpinnerService) { 
      this._ActivatedRoute.params.subscribe(()=>{
        this.mediaType=_ActivatedRoute.snapshot.paramMap.get("mediaType")
       if(this.mediaType=="tv"){
         this.media="Tv show"
       }
       else{
         this.media="Movie"
       }
        this.id=_ActivatedRoute.snapshot.paramMap.get("id")
       Spinner.show()
        _DataService.getDetails(this.mediaType,this.id).subscribe((response)=>{
         Spinner.hide()
          this.itemDetails=response
          if(this.itemDetails.success==false){
            this._Router.navigateByUrl("/notfound")
        
          }
          if(this.itemDetails.genres[0]){
            this.showGenre=true
          }
        })
        _DataService.getTrailer(this.mediaType,this.id).subscribe((videos)=>{
          this.Trailer=videos.results[0].key
          if(videos.results[0].key){
             this.showRow=true
          }
          this.videoSrc=`https://www.youtube.com/embed/${this.Trailer}?rel=0`
        })
      })

    }
    videoURL(videoSrcUrl:any) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(videoSrcUrl);
    }
  ngOnInit(): void {
  }

}
