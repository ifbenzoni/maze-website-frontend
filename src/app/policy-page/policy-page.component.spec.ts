import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPageComponent } from './policy-page.component';

describe('PolicyPageComponent', () => {
  let component: PolicyPageComponent;
  let fixture: ComponentFixture<PolicyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyPageComponent]
    });
    fixture = TestBed.createComponent(PolicyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
