import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeVisualComponent } from './maze-visual.component';

describe('MazeVisualComponent', () => {
  let component: MazeVisualComponent;
  let fixture: ComponentFixture<MazeVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeVisualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MazeVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
