import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;

import { RatingComponent } from './rating.component';


describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule],
      declarations: [ RatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * This function checks if the component is correctly created.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Checks if the component updates correctly the rating values.
   */
  it('should change the rating', () => {
    component.addRate(4.5)
    fixture.detectChanges();
    expect(document.querySelectorAll('.full').length).toBe(4)
    expect(document.querySelectorAll('.half').length).toBe(1)

    component.addRate(1)
    fixture.detectChanges();
    expect(document.querySelectorAll('.full').length).toBe(1)
    expect(document.querySelectorAll('.half').length).toBe(0)
  });

  /**
   * This function tests if displays correctly the full and the half stars.
   */
  it('should display the rating', () => {
    component.currentRate = 4.5
    fixture.detectChanges();

    expect(document.querySelectorAll('.full').length).toBe(4)
    expect(document.querySelectorAll('.half').length).toBe(1)

  });
});
