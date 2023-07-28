import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-maze-visual',
  styleUrls: ['./maze-visual.component.css'],
  template: `
    <main [ngStyle]="{'height' : mazeArray.length * 30 + 'px', 'width' : mazeArray.length * 30 + 'px'}">
      <div *ngFor='let line of mazeArray ; let i = index'>
        <app-square
          *ngFor='let val of line ; let j = index'
          [type] = val [interactive] = interactive
          [x] = i [y] = j [maze] = mazeArray>
        </app-square>
      </div>
    </main>
  `,
  styles: [
  ]
})
export class MazeVisualComponent {

  @Input() mazeArray: number[][] = [];
  @Input() interactive: Boolean = false;

  ngOnInit() {
    if (this.mazeArray == undefined || this.mazeArray.length == 0) {
      this.mazeArray = [[], [], [], [], [], [], [], [], []];
    }
  }

}
