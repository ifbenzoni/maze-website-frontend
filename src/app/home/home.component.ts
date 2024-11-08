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

  title = 'aMAZEing website';

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
    localStorage.removeItem('details');
  }

  public login(username: string, password: string): void {
    const user = JSON.stringify({username: username, password: password});
    this.accountService.login(user).subscribe({
      next: (output: string) => {
        console.group(output);
        this.getUserDetails();
        this.getTimeRemaining();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public logout(): void {
    this.accountService.logout().subscribe({
      next: (output: string) => {
        console.group(output);
        this.getUserDetails();
        this.getTimeRemaining();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public getUserDetails(): void {
    this.accountService.getJwtUserDetails().subscribe({
      next: (output: string[] | null) => {
        console.log(output);
        this.details = output;
        localStorage.setItem('details', JSON.stringify(output));
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.details = null;
        //if user details not able to be retrieved it's likely login time should be null
        if (this.loginRemaining != null) {
          this.getTimeRemaining();
        }
      }
    })
  }

  public getTimeRemaining(): void {
    this.accountService.getTimeRemaining().subscribe({
      next: (output: number) => {
        console.log(output);
        this.loginRemaining = output;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.loginRemaining = null;
        //if login time not able to be retrieved it's likely user details should be null
        if (this.details != null) {
          this.getUserDetails();
        }
      }
    })
  }
}
