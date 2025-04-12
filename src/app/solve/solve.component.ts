import { Component, HostListener } from '@angular/core';
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

  title = 'Turtle Mini-game';

  public generatedMaze: number[][] = [];
  public generationType: String = 'empty';
  public size: number | null = null;
  public turtlePos: number[] = [];
  public turtleAngle = 0;

  public completionDisplay: String | null = null;

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
    this.completionDisplay = null;
    if (size != null) {
      this.turtlePos[0] = size - 1;
      this.turtlePos[1] = size - 1;
    } else {
      this.turtlePos[0] = 9 - 1;
      this.turtlePos[1] = 9 - 1;
    }
    this.turtleAngle = 0;
  }

  public async checkMaze(maze: number[][]): Promise<boolean> {
    const output = await firstValueFrom(this.mazeService.checkSolution(maze));
    console.log(output);
    return output;
  }

  public setCompletion(): void {
    let completion: boolean | null = null;
    this.checkMaze(this.generatedMaze).then((value:boolean) => {
      console.log(value);
      completion = value;
      if (completion == true) {
        this.completionDisplay = 'Complete!';
      } else {
        this.completionDisplay = 'Incomplete';
      }
    });
  }

  public saveMaze(): void {
    this.accountService.saveMazeInfo(this.generatedMaze).subscribe({
      next: (response: boolean) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }

  updateTurtleAngle(newAngle: number) {
    this.turtleAngle = newAngle;
  }

  ngOnInit() {
    this.setMaze('dfs', 9);
  }

}