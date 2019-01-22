import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AlertifyService } from './../_Services/alertify.service';
import { AuthService } from './../_Services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OutletContext, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Users } from '../_models/Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  user: Users;
  model: any = {};
  constructor(private auth: AuthService, private alertify: AlertifyService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterFOrm();
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    //   confirmpassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);
  }

  createRegisterFOrm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', [Validators.required, Validators.minLength(4)]],
      knownAs: ['', [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmpassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmpassword').value ? null : {'mismatch': true};
  }

  // register() {
  //   // this.auth.register(this.model).subscribe(() => {
  //   //   this.alertify.success('Registration is succesfull');
  //   // } , error => {
  //   //   this.alertify.error('Error');
  //   // });
  //   console.log(this.registerForm.value);
  // }

  register() {
    if (this.registerForm.valid) {
        this.user = Object.assign({}, this.registerForm.value);
        this.auth.register(this.user).subscribe(() => {
          this.alertify.success('Registration Succsfully');
        }, error => {
          this.alertify.error(error);
        }, () => {
          this.auth.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
          });
        });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.message('cancelled');
  }
}
