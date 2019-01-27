import { Pagination, PaginatedResult } from './../../_models/Pagination';
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
user: Users = JSON.parse(localStorage.getItem('user'));
pagination: Pagination;
genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
userParams: any = {};


  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.users = data['users'].results;
        this.pagination = data['users'].pagination;
      });

      this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
      this.userParams.minAge = 18;
      this.userParams.maxAge = 99;
      this.userParams.orderBy = 'lastActive';
  }

  resetFilter() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
    console.log(this.pagination.currentPage);
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((result: PaginatedResult<Users[]>) => {
      this.users = result.result;
      this.pagination = result.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

}
