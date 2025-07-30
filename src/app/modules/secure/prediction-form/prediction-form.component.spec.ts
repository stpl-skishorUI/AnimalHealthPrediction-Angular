import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionFormComponent } from './prediction-form.component';

describe('PredictionFormComponent', () => {
  let component: PredictionFormComponent;
  let fixture: ComponentFixture<PredictionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PredictionFormComponent]
    });
    fixture = TestBed.createComponent(PredictionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
