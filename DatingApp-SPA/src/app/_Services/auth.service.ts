import { Users } from 'src/app/_models/Users';
import { AlertifyService } from './alertify.service';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { Injectable } from '@angular/core';
import {map} from 'rxJs/Operators';
import { JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl =  environment.apiUrl + 'auth/';
jwtHelper  = new JwtHelperService();
decodeToken: any;
currentUser: Users;
photoUrl = new BehaviorSubject<string>('../../assets/user.png');
currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient, private alertifyService: AlertifyService ) { }

changeMemberPhoto(photoUrl: string) {
  this.photoUrl.next(photoUrl);
}

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodeToken = this.jwtHelper.decodeToken(user.token);
        this.currentUser = user.user;
        this.changeMemberPhoto(this.currentUser.photoUrl);


        // localStorage.setItem('token', user.token);
        // localStorage.setItem('user', JSON.stringify(user.Users));
        // this.decodeToken = this.jwtHelper.decodeToken(user.token);
        // // this.decodeToken = this.jwtHelper.decodeToken(user.token);
        // this.currentUser = user.Users;
        // console.log(this.decodeToken);
        // // this.alertifyService.message(this.decodedToken);
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
