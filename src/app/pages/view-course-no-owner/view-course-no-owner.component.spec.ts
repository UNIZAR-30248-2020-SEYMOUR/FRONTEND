import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseNoOwnerComponent } from './view-course-no-owner.component';

describe('ViewCourseNoOwnerComponent', () => {
  let component: ViewCourseNoOwnerComponent;
  let fixture: ComponentFixture<ViewCourseNoOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourseNoOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseNoOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 /* it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
