import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTuneComponent } from './new-tune.component';

describe('NewTuneComponent', () => {
  let component: NewTuneComponent;
  let fixture: ComponentFixture<NewTuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
