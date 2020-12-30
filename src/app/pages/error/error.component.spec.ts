import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import {ActivatedRoute} from "@angular/router";

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivatedRoute],
      declarations: [ ErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
