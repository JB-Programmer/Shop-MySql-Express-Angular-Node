import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDataFull } from './../app/new-user/new-user-class';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: Http) { }


  // tslint:disable-next-line:max-line-length
  createUser(name: string, surname: string, username: string, password: string, email: string, zehut: number, street: string, city: string) {
    // tslint:disable-next-line:max-line-length
    const theDataObject: UserDataFull = {name: name, surname: surname, username: username, password: password, email: email, zehut: zehut, street: street, city: city };
    return this.http.post('http://localhost:4040/signupuser', theDataObject)
    .subscribe(response => {
      console.log(response);
    });
  }


  login(email: string, password: string){
    //console.log("loginFunction from auth service has been called");
    const theDataObject = {email: email, password: password };
    return this.http.post('http://localhost:4040/login', theDataObject)
    .subscribe(response => {
      console.log(response);
    });

  }




}
