import { AlertifyService } from './../_Services/alertify.service';
import { AuthService } from './../_Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public auth: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }
  login() {
    this.auth.login(this.model).subscribe(next => {
      this.alertify.success('Looged in succesfully');
    }, error  => {
      this.alertify.error(error);
    });
  }
  loggedIn() {
  return this.auth.loggedIn();
  }
  logOut() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }

}
