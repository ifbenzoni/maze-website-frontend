import { Component } from '@angular/core';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  details: string[] | null = null;

  newUserDetails: string[] = [];

  constructor(private accountService: AccountService) {}

  public ngOnInit(): void {
    let detailsString: string | null = localStorage.getItem('details');
    if (detailsString != null) {
      this.details = JSON.parse(detailsString);
    }
  }

  public addUser(username: string, password: string): void {
    const jwt = localStorage.getItem('userInfoJwt');
    //finish this and below
    this.accountService.addUser(jwt, JSON.stringify({username: username, password: password}));
  }

  public getUsers(): void {

  }
}