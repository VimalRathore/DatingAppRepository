import { AlertifyService } from './alertify.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxJs/Operators';
import { JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl =  'http://localhost:5000/api/auth/';
jwtHelper  = new JwtHelperService();
decodeToken: any;

constructor(private http: HttpClient, private alertifyService: AlertifyService ) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodeToken = this.jwtHelper.decodeToken(user.token);
        // this.decodeToken = this.jwtHelper.decodeToken(user.token);
        console.log(this.decodeToken);
        // this.alertifyService.message(this.decodedToken);
      }
    } )
  );
}

register(model: any) {
return this.http.post(this.baseUrl + 'register', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}
}
