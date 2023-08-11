import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRecentComponent } from './most-recent.component';

describe('MostRecentComponent', () => {
  let component: MostRecentComponent;
  let fixture: ComponentFixture<MostRecentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostRecentComponent]
    });
    fixture = TestBed.createComponent(MostRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
