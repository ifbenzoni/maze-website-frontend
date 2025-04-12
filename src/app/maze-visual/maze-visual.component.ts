import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maze-visual',
  styleUrls: ['./maze-visual.component.css'],
  template: `
    <main [ngStyle]="{'height' : mazeArray.length * 30 + 'px', 'width' : mazeArray.length * 30 + 'px'}">
      <div *ngFor='let line of mazeArray ; let i = index'>
      <ng-container *ngIf='isOnGamePage()'>
          <ng-container *ngFor='let val of line ; let j = index'>
            <app-square
              *ngIf='!((j == mazeArray.length - 1) && (i == mazeArray.length - 1)) && val != 4'
              [type] = val
              [interactive] = "(!(getManhattanDistance(i,j) == 1) || (val != 0 && val != 3)) ? false : interactive"
              [x] = i [y] = j [maze] = mazeArray
              [turtlePos]="turtlePos" 
              (turtlePosChange)="updateTurtlePos($event)"
              (turtleAngleChange)="updateTurtleAngle($event)"
              (changeCompletion)="setCompletion()">
            </app-square>
            <app-square
              *ngIf='((j == mazeArray.length - 1) && (i == mazeArray.length - 1))'
              [type] = 0
              [interactive] = "(!(getManhattanDistance(i,j) == 1) || (val != 0 && val != 3 && val != 4)) ? false : interactive"
              [x] = i [y] = j [maze] = mazeArray
              [turtlePos]="turtlePos" 
              (turtlePosChange)="updateTurtlePos($event)"
              (turtleAngleChange)="updateTurtleAngle($event)"
              (changeCompletion)="setCompletion()">
            </app-square>
            <app-square
              *ngIf='!((j == mazeArray.length - 1) && (i == mazeArray.length - 1)) && val == 4'
              [type] = val
              [interactive] = "(!(getManhattanDistance(i,j) == 1) ? false : true)"
              [x] = i [y] = j [maze] = mazeArray
              [turtlePos]="turtlePos" 
              (turtlePosChange)="updateTurtlePos($event)"
              (turtleAngleChange)="updateTurtleAngle($event)"
              (changeCompletion)="setCompletion()">
            </app-square>
          </ng-container>
        </ng-container>
        <ng-container *ngIf='!isOnGamePage()'>
          <ng-container *ngFor='let val of line ; let j = index'>
            <app-square
              [type] = val
              [interactive] = interactive
              [x] = i [y] = j [maze] = mazeArray>
            </app-square>
          </ng-container>
        </ng-container>
      </div>
    </main>
  `,
  styles: [
  ]
})
export class MazeVisualComponent {

  @Input() mazeArray: number[][] = [];
  @Input() interactive: Boolean = false;
  @Input() turtlePos: number[] = [];
  @Input() turtleAngle: number = 0;
  @Output() turtleAngleChange: EventEmitter<number> = new EventEmitter();
  @Output() changeCompletion: EventEmitter<void> = new EventEmitter();

  ngOnInit() {
    if (this.mazeArray == undefined || this.mazeArray.length == 0) {
      this.mazeArray = [[], [], [], [], [], [], [], [], []];
    }
  }

  getManhattanDistance(i: number, j: number): number {
    return Math.abs(i - this.turtlePos[0]) + Math.abs(j - this.turtlePos[1]);
  }

  updateTurtlePos(newPos: number[]) {
    this.turtlePos = newPos;
  }

  updateTurtleAngle(newAngle: number) {
    this.turtleAngle = newAngle;
    this.turtleAngleChange.emit(this.turtleAngle);
  }

  setCompletion() {
    this.changeCompletion.emit();
  }

  constructor(private router: Router) {}

  isOnGamePage(): boolean {
    return this.router.url === '/game';
  }
}
