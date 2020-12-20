import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseNoOwnerComponent } from './view-course-no-owner.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('ViewCourseNoOwnerComponent', () => {
  let component: ViewCourseNoOwnerComponent;
  let fixture: ComponentFixture<ViewCourseNoOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ ViewCourseNoOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseNoOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
