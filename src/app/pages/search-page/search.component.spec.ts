import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { SearchPageComponent } from './search-page.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from "protractor";

describe('SearchComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ SearchPageComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should hide the categories selector',() => {
    expect(document.getElementById('course-filter-input-group').hidden).toBeTrue();
    /*const select = (<HTMLSelectElement>document.getElementById("combo-categories"));
    select.selectedIndex = 1;
    select.dispatchEvent(new Event('change'));*/


    const select: HTMLSelectElement = (<HTMLSelectElement>document.getElementById("combo-type"));
    select.value = select.options[1].value;  // <-- select a new value
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(document.getElementById('course-filter-input-group').hidden).toBeFalse();
    select.value = select.options[0].value;  // <-- select a new value
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(document.getElementById('course-filter-input-group').hidden).toBeTrue();
  });

  /**
   * Verifies that the component is correctly created.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
