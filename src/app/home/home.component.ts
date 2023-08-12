import { Component, HostListener } from '@angular/core';

import { LoginService } from '../login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'Maze Wesite Homepage';

  inputUsername: string = '';
  inputPassword: string = '';

  loggedIn: boolean = false;
  details: string[] | null = null;

  constructor(private loginService: LoginService) { }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: HTMLElement | null; }) {
    console.log(event.target)
    if (event.target?.className === 'modal') {
      event.target.style.display = 'none';
      this.inputPassword = '';
    }
  }

  public login(username: string, password: string): void {
    const user = JSON.stringify({username: username, password: password});
    this.loginService.login(user).subscribe({
      next: (output: string) => {
        localStorage.setItem('userInfoJwt', output);
        this.loggedIn = true;
        this.getUserDetails();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public getUserDetails(): void {
    const jwt = localStorage.getItem('userInfoJwt');
    this.loginService.getJwtUserDetails(jwt).subscribe({
      next: (output: string[] | null) => {
        console.log(output);
        if (output == null) {
          this.loggedIn = false;
        }
        this.details = output;
        localStorage.setItem('details', JSON.stringify(output));
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
}
