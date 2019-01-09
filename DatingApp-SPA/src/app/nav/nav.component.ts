import { AuthService } from './../_Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.auth.login(this.model).subscribe(next => {
      console.log('Looged in succesfully');
    }, error  => {
      console.log('Failed to login');
    });
  }
  loggedIn() {
   const token = localStorage.getItem('token');
   return !!true;
  }
  logOut() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
