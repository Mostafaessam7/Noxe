import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allData:any[]=[]
trendingMovies:any[]=[]
trendingShows:any[]=[]
  constructor(private _DataService:DataService, private Spinner:NgxSpinnerService) { 
    Spinner.show()
    _DataService.getTrending("all").subscribe((data)=>{
      Spinner.hide()
      this.allData=data.results.filter((item:any)=>{
        return item.poster_path!=null
      })
      this.trendingMovies = this.allData.filter((item:any)=>{
       return item.media_type=="movie"
      })
      this.trendingShows = this.allData.filter((item:any)=>{
        return item.media_type=="tv"
       })

    })
    
  }

  ngOnInit(): void {
  }

}
