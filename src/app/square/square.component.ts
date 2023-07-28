import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  styleUrls: ['./square.component.css'],
  template: ` 
      <p class = 'unvisited-square' *ngIf='type == 2'></p>
      <p class = 'wall-square' *ngIf='type == 1'></p>
      <p class = 'empty-square' *ngIf='type == 0 && interactive == false'></p>
      <p *ngIf='type == 0 && interactive == true'>
        <button class = 'empty-square' (click)='toggleSelect()'></button>
      </p>
      <p *ngIf='type == 3 && interactive == true'>
        <button class = 'selected-square' (click)='toggleSelect()'></button>
      </p>
      <div class = 'end-square' *ngIf='type == 4'>
        <p class = 'end-circle'><p>
      <div>
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

  public toggleSelect(): void {
    if (this.type == 0) {
      this.maze[this.x][this.y] = 3;
    } else {
      this.maze[this.x][this.y] = 0;
    }
  }

}
