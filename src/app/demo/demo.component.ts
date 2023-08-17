import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MazeService } from '../maze.service';

@Component({
  selector: 'app-demo',
  templateUrl: `./demo.component.html`,
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {

  title = 'Demo Page';

  public generatedSteps: number[][][] = [];
  public stepAmount: number = 0;
  public currentStep: number = 0;
  public demoTimer: NodeJS.Timer | null = null;
  public generationType: String = 'empty';

  constructor(private mazeService: MazeService) { }

  public setMaze(type: String): void {
    if (!('empty' === this.generationType)) {
      this.mazeService.defaultGetMazeFull(type).subscribe ({
        next: (response: number[][][]) => {
          console.log(response);
          //set maze values
          this.generatedSteps = response;
          this.currentStep = 2;
          this.stepAmount = response.length;
          if (this.demoTimer == null) {
            this.demoTimer = setInterval(() => {
              this.incrementStep();
            }, 1000);
          }
        }, 
        error: (error: HttpErrorResponse) => {
          alert(error.message)
        }
      })
    } else {
      alert('Generation type is empty.')
    }
  }

  public incrementStep() {
    if (this.currentStep < this.stepAmount) {
      this.currentStep++;
    } else {
      this.currentStep = 0;
    }
  }

}
