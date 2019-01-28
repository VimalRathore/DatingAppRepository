import { UserService } from 'src/app/_Services/user.service';
import { Pagination, PaginatedResult } from './../_models/Pagination';
import { Component, OnInit } from '@angular/core';
import { Users } from '../_models/Users';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_Services/auth.service';
import { AlertifyService } from '../_Services/alertify.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
users: Users[];
pagination: Pagination;
likesParam: string;
  constructor(private authService: AuthService, private userService: UserService
    , private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
    console.log(this.pagination.currentPage);
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe(
        (result: PaginatedResult<Users[]>) => {
         this.users = result.result;
         this.pagination = result.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

}
