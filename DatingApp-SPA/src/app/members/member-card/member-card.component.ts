import { AlertifyService } from 'src/app/_Services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_Services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Users } from 'src/app/_models/Users';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user: Users;

  constructor(private authService: AuthService, private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(userId: number) {
    this.userService.sendLike(this.authService.decodeToken.nemedid, userId).subscribe(data => {
      this.alertify.success('you have liked:' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }


}
