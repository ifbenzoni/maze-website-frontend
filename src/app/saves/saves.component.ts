import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-saves',
  templateUrl: './saves.component.html',
  styleUrls: ['./saves.component.css']
})
export class SavesComponent {

  constructor(private accountService: AccountService) {}

  allMazes: number[][][] = [];

  public ngOnInit() {
    this.getMazes();
  }

  public getMazes(): void {
    const jwt = localStorage.getItem('userInfoJwt');
    this.accountService.getMazeInfo(jwt).subscribe({
      next: (output: number[][][]) => {
        console.log(output);
        this.allMazes = output;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }

  public removeMaze(index: number): void {
    const jwt = localStorage.getItem('userInfoJwt');
    this.accountService.removeMazeInfo(jwt, index).subscribe({
      next: (output: boolean) => {
        console.log(output);
        this.getMazes();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }

}
