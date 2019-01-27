import { AlertifyService } from './../_Services/alertify.service';
import { AuthService } from './../_Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public auth: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.auth.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }
  login() {
    this.auth.login(this.model).subscribe(next => {
      this.alertify.success('Looged in succesfully');
    }, error  => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }
  loggedIn() {
  return this.auth.loggedIn();
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.auth.decodeToken = null;
    this.auth.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
