import { AuthService } from './../_Services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
model: any = {};
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  register() {
    this.auth.register(this.model).subscribe(() => {
      console.log('Registration is succesfull');
    } , error => {
      console.log('Error');
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
     console.log('cancelled');
  }

}
