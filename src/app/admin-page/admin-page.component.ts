import { Component } from '@angular/core';

import { AccountService } from '../account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  newUserDetails: string[] = [];

  allUsernames: string[] = [];

  constructor(private accountService: AccountService) {}

  public ngOnInit(): void {
    this.getUsers();
  }

  public addUser(username: string, password: string): void {
    const jwt = localStorage.getItem('userInfoJwt');
    const user = JSON.stringify({username: username, password: password, role: "GUEST"});
    this.accountService.addUser(jwt, user).subscribe({
      next: (response: boolean) => {
        console.log(response);
        this.getUsers();
      }, 
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public removeUser(username: string): void {
    const jwt = localStorage.getItem('userInfoJwt');
    const user = JSON.stringify({username: username});
    this.accountService.removeUser(jwt, user).subscribe({
      next: (response: boolean) => {
        console.log(response);
        this.getUsers();
      }, 
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public getUsers(): void {
    const jwt = localStorage.getItem('userInfoJwt');
    this.accountService.getUsers(jwt).subscribe({
      next: (response: string[]) => {
        console.log(response);
        this.allUsernames = response;
      }, 
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}