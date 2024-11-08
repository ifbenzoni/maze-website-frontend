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
    const user = JSON.stringify({username: username, password: password, role: "GUEST"});
    this.accountService.addUser(user).subscribe({
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
    const user = JSON.stringify({username: username});
    this.accountService.removeUser(user).subscribe({
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
    this.accountService.getUsers().subscribe({
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