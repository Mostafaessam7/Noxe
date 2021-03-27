import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {
  
page:number=0  
personData:any=[]
knownFor:any[]=[]
id:any;
profileSrc:string=""
Src:any=[];
  constructor(private _Router:Router, private _DataService:DataService, private _ActivatedRoute:ActivatedRoute) {
    this.id=_ActivatedRoute.snapshot.paramMap.get("id")
    _DataService.getDetails("person",this.id).subscribe((response)=>{
      this.personData=response
  
      this.profileSrc=`https://image.tmdb.org/t/p/original/${this.personData.profile_path}`
    })
    _DataService.getCredits(this.id).subscribe((data)=>{
      this.knownFor=data.cast
      this.knownFor=this.knownFor.filter((item)=>{
        return item.poster_path!=null

      })
    })
   }

  ngOnInit(): void {
   
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
