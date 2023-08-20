import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MazeService } from '../maze.service';
import { firstValueFrom } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-solve',
  templateUrl: './solve.component.html',
  styleUrls: ['./solve.component.css']
})
export class SolveComponent {

  title = 'Solve Page';

  public generatedMaze: number[][] = [];
  public generationType: String = 'empty';
  public size: number | null = null;

  public accuracyDisplay: String | null = null;

  constructor(private mazeService: MazeService, private accountService: AccountService) { }

  public setMaze(type: String, size: number | null): void {
    if (!('empty' === type) && null != size) {
      this.mazeService.getMazeFinal(type, size).subscribe ({
        next: (response: number[][]) => {
          console.log(response);
          this.generatedMaze = response;
        }, 
        error: (error: HttpErrorResponse) => {
          alert(error.message)
        }
      })
    } else if (!('empty' === this.generationType)) {
      this.mazeService.defaultGetMazeFinal(type).subscribe ({
        next: (response: number[][]) => {
          console.log(response);
          this.generatedMaze = response;
        }, 
        error: (error: HttpErrorResponse) => {
          alert(error.message)
        }
      })
    } else {
      alert('Generation type is empty.')
    }
    this.accuracyDisplay = null;
  }

  public async checkMaze(maze: number[][]): Promise<boolean> {
    const output = await firstValueFrom(this.mazeService.checkSolution(maze));
    console.log(output);
    return output;
  }

  public setAccuracy(): void {
    let accuracy: boolean | null = null;
    this.checkMaze(this.generatedMaze).then((value:boolean) => {
      console.log(value);
      accuracy = value;
      if (accuracy == true) {
        this.accuracyDisplay = 'Correct';
      } else {
        this.accuracyDisplay = 'Incorrect';
      }
    });
  }

  public saveMaze(): void {
    const jwt = localStorage.getItem('userInfoJwt');
    this.accountService.saveMazeInfo(jwt, this.generatedMaze).subscribe({
      next: (response: boolean) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }


}