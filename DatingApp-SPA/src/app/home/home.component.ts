import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: any;
  values: any;
  loggedin: any;
  constructor(private http: HttpClient, public authService: AuthService) {
    this.loggedin = this.authService.loggedIn();
   }

  ngOnInit() {
    // this.getValues();
  }
  registerToggle() {
   this.registerMode = true;
  }

  // getValues() {
  //   this.http.get('http://localhost:5000/api/values').subscribe(response => {
  //     this.values = response;
  //     console.log(this.values);
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
