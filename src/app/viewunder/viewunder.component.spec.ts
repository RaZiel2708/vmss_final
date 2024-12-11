import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewunderComponent } from './viewunder.component';

describe('ViewunderComponent', () => {
  let component: ViewunderComponent;
  let fixture: ComponentFixture<ViewunderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewunderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewunderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
