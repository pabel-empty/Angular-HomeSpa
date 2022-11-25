import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable( { providedIn: 'root' } )
export class HomeServices {

  constructor( private http: HttpClient ) { }

  getServices( page: number, size: number ) {
    return this.http.get<any[]>( `/api/services?page=${ page }&size=${ size }` );
  }

}
