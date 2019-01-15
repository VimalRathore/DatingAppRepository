import { ActivatedRoute } from '@angular/router';
import { Users } from '../../_models/Users';
import { AlertifyService } from '../../_Services/alertify.service';
import { UserService } from '../../_Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
users: Users[];
  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.users = data['users'];
      });
    // this.loadUsers();
  }

//   loadUsers() {
// this.userService.getUsers().subscribe((users: Users[]) => {
//   this.users = users;
// }, error => {
//    this.alertify.error(error);
// });

//   }

}
