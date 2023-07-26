import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventuresListComponent } from './adventures-list.component';

describe('AdventuresListComponent', () => {
  let component: AdventuresListComponent;
  let fixture: ComponentFixture<AdventuresListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdventuresListComponent]
    });
    fixture = TestBed.createComponent(AdventuresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
