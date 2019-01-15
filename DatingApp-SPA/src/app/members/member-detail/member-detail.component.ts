import { AlertifyService } from './../../_Services/alertify.service';
import { UserService } from './../../_Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ComponentFactory } from '@angular/core/src/render3';
import { Users } from 'src/app/_models/Users';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: Users;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

ngOnInit() {
// this.loadUser();

this.route.data.subscribe(data => {
this.user = data['user'];
});

  newFunction().NgxGalleryOptions = [
    {
        width: '650px',
        height: '650px',
        thumbnailsColumns: 4,
       // imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
    }
  ];
  this.galleryImages = this.getImages();
}

// Image Gallery
getImages() {
  const imageUrls = [];
  for (let i = 0; i < this.user.photos.length; i++) {
    imageUrls.push({
      small: this.user.photos[i].url,
      medium: this.user.photos[i].url,
      big: this.user.photos[i].url,
      description: this.user.photos[i].description
    });
  }
  return imageUrls;
}

  // loadUser() {
  //   this.userService.getuser(+ this.route.snapshot.params['id']).subscribe((user: Users) => {
  //     this.user = user;
  //   }, error => {
  //      this.alertify.error(error);
  //   });
  // }
}
function newFunction() {
  return this;
}

