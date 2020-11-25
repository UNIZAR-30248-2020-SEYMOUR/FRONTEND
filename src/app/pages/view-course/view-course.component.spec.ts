import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseComponent } from './view-course.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('ViewCourseComponent', () => {
  let component: ViewCourseComponent;
  let fixture: ComponentFixture<ViewCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ ViewCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('should create', () => {
    expect(component).toBeTruthy();
  });
});
