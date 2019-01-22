import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Users } from 'src/app/_models/Users';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { AuthService } from 'src/app/_Services/auth.service';
import { UserService } from 'src/app/_Services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
user: Users;
photoUrl: string;
@ViewChild('editForm') editForm: NgForm;
@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any) {
 if (this.editForm.dirty) {
     $event.returnValue = true;
 }
}


constructor(private route: ActivatedRoute, private alertify: AlertifyService,
  private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      });
      this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
   alert(this.user);
     this.userService.updateUser(this.authService.decodeToken.nameid, this.user).subscribe(next => {
       this.alertify.success('Profile Succesfully updated');
       this.editForm.reset(this.user);
     }, error => {
       this.alertify.error(error);
     });
  }
  updateMainPhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }

}
