import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   
  constructor(private _HttpClient:HttpClient) { 
  }
  getTrending(mediaType:any):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=4e7812d8ee04b5c30817c6bd07a9474e`)
  }
  getData(mediaType:any,mediaCategory:any,page:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/${mediaCategory}?api_key=4e7812d8ee04b5c30817c6bd07a9474e&page=${page}`)
  }
  getDetails(mediaType:any,id:any):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=4e7812d8ee04b5c30817c6bd07a9474e`)

  }
  getTrailer(mediaType:any,id:any):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=4e7812d8ee04b5c30817c6bd07a9474e`)

  }
  getCredits(id:any):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=4e7812d8ee04b5c30817c6bd07a9474e`)
  }
  search(searchText:any):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/search/multi?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${searchText}`)

  }
}
