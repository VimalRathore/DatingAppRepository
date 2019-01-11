import { AlertifyService } from './../_Services/alertify.service';
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
  constructor(private auth: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }
  register() {
    this.auth.register(this.model).subscribe(() => {
      this.alertify.success('Registration is succesfull');
    } , error => {
      this.alertify.error('Error');
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.message('cancelled');
  }

}
