import { Component, HostListener } from '@angular/core';

import { AccountService } from '../account.service';
import { HttpErrorResponse } from '@angular/common/http';

const MS_IN_HALF_MIN: number = 30000;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'Maze Wesite Homepage';

  inputUsername: string = '';
  inputPassword: string = '';

  details: string[] | null = null;

  loginRemaining: number | null = null;
  timeRemainingTimer: NodeJS.Timeout | null = null;

  constructor(private accountService: AccountService) { }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: HTMLElement | null; }) {
    console.log(event.target)
    if (event.target?.className === 'modal') {
      event.target.style.display = 'none';
      this.inputPassword = '';
    }
  }

  public ngOnInit(): void {
    this.getUserDetails();
    this.getTimeRemaining();
    this.timeRemainingTimer = setInterval(() => {
      this.getTimeRemaining();   
    }, MS_IN_HALF_MIN);
    let storageDetails: string | null = localStorage.getItem('details');
    if (storageDetails != null) {
      this.details = JSON.parse(storageDetails);
    } else {
      this.details = storageDetails;
    }
  }

  public ngOnDestroy(): void {
    if (this.timeRemainingTimer) {
      clearInterval(this.timeRemainingTimer);
    }
  }

  public login(username: string, password: string): void {
    const user = JSON.stringify({username: username, password: password});
    this.accountService.login(user).subscribe({
      next: (output: string) => {
        localStorage.setItem('userInfoJwt', output);
        this.getUserDetails();
        this.getTimeRemaining();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public logout(): void {
    localStorage.removeItem('userInfoJwt');
    this.getUserDetails();
    this.getTimeRemaining();
  }

  public getUserDetails(): void {
    const jwt = localStorage.getItem('userInfoJwt');
    this.accountService.getJwtUserDetails(jwt).subscribe({
      next: (output: string[] | null) => {
        console.log(output);
        this.details = output;
        localStorage.setItem('details', JSON.stringify(output));
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.details = null;
      }
    })
  }

  public getTimeRemaining(): void {
    const jwt = localStorage.getItem('userInfoJwt');
    this.accountService.getTimeRemaining(jwt).subscribe({
      next: (output: number) => {
        console.log(output);
        this.loginRemaining = output;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.loginRemaining = null;
      }
    })
  }
}
