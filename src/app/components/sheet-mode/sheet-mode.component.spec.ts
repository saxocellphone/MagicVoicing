import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetModeComponent } from './sheet-mode.component';

describe('SheetModeComponent', () => {
  let component: SheetModeComponent;
  let fixture: ComponentFixture<SheetModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
