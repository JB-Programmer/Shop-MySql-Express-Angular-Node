import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: Http) { }

  getAllProducts(): Observable<any> {
    return this.http.get('http://localhost:4040/products');
  }

  getProductsByCatName(catname): Observable<any> {
    return this.http.get('http://localhost:4040/category/?catname=' + catname);
  }

  getCategoriesNames(){
    console.log('Get Categories was called');
    return this.http.get('http://localhost:4040/categoriesnames')
  }

}
