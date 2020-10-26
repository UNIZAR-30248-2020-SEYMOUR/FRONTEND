import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(' should validate fields should create', () => {
    component.registerForm =  new FormGroup({
      'username': new FormControl('asdfasdfsadfasdf', ),
      'email': new FormControl('asdfasdfasdfsadf', ),
      'pswd': new FormControl('asdfasdfasdfsadf', ),
      'repeat_pswd': new FormControl('asdfasdfsadf', ),
      'description': new FormControl('asdfasdfsadf')});

    fixture.nativeElement.querySelector('Crear cuenta');
    alert(component.validateFields());
    expect(component.validateFields()).toEqual(true);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
