import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  username: any;
  email: any;
  description: any;
  courses: any;
  disabled: any;

  constructor() {
    this.disabled = 'false';
    this.description = 'lorem ipsum dolor asdfas csadcasdcsadca sdcasd csadcsac';
    this.courses = ['uno', 'dos', 'tres'];
  }

  ngOnInit() {
  }

  savechanges() {

  }
}
