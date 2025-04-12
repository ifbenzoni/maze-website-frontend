import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-square',
  styleUrls: ['./square.component.css'],
  template: ` 
      <p class = 'unvisited-square' *ngIf='type == 2'></p>
      <p class = 'wall-square' *ngIf='type == 1'></p>
      <p class = 'empty-square' *ngIf='type == 0 && interactive == false'></p>
      <p *ngIf='type == 0 && interactive == true'>
        <button class = 'empty-square-option' (click)='toggleSelect()'></button>
      </p>
      <p *ngIf='type == 3 && interactive == true'>
        <button class = 'selected-square-option' (click)='toggleSelect()'></button>
      </p>
      <p class = 'selected-square' *ngIf='type == 3 && interactive == false'></p>
      <p class = 'end-square' *ngIf='type == 4 && interactive == false'><p>
      <p *ngIf='type == 4 && interactive == true'>
        <button class = 'end-square' (click)='toggleSelect()'></button>
      </p>
  `,
  styles: [
  ]
})
export class SquareComponent {

  @Input() type: number = 0;
  @Input() interactive: Boolean = false;
  @Input() maze: number[][] = [];
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() turtlePos: number[] = [];
  @Output() turtlePosChange: EventEmitter<number[]> = new EventEmitter();
  @Output() turtleAngleChange: EventEmitter<number> = new EventEmitter();
  @Output() changeCompletion: EventEmitter<void> = new EventEmitter();

  public toggleSelect(): void {
    var outputAngle = 0;
    if (this.x - this.turtlePos[0] > 0) {
      outputAngle = 90
    } else if (this.x - this.turtlePos[0] < 0) {
      outputAngle = 270
    } else if (this.y - this.turtlePos[1] > 0) {
      outputAngle = 180
    }
    if (this.type == 0 || this.type == 3) {
      this.turtlePos[0] = this.x;
      this.turtlePos[1] = this.y;
      this.turtlePosChange.emit(this.turtlePos);
      this.turtleAngleChange.emit(outputAngle);
      this.maze[this.turtlePos[0]][this.turtlePos[1]] = 3;
    } else if (this.type == 4) {
      this.turtlePos[0] = this.x;
      this.turtlePos[1] = this.y;
      this.turtlePosChange.emit(this.turtlePos);
      this.turtleAngleChange.emit(outputAngle);
      this.setCompletion();
    } else {
      this.maze[this.x][this.y] = 0;
      this.turtlePosChange.emit(this.turtlePos);
      this.turtleAngleChange.emit(outputAngle);
    }
  }

  setCompletion() {
    this.changeCompletion.emit();
  }
}
