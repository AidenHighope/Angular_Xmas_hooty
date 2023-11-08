import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogListGameComponent } from './log-list-game.component';

describe('LogListGameComponent', () => {
  let component: LogListGameComponent;
  let fixture: ComponentFixture<LogListGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogListGameComponent]
    });
    fixture = TestBed.createComponent(LogListGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
