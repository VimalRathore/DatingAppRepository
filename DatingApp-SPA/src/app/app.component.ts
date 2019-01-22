import { AuthService } from './_Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService} from '@auth0/angular-jwt';
import { Users } from './_models/Users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper  = new JwtHelperService();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: Users = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodeToken = this.jwtHelper.decodeToken(token);
    }

    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
}

