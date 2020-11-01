import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ RegisterComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should feedback invalid username', () => {
    (<HTMLInputElement>document.getElementById('input-username')).value = '';
     document.getElementById('register-button').click();
     const result = (<HTMLSpanElement>document.getElementById('input-username')).style.border;
     expect(result).toBe('2px solid rgb(220, 53, 69)');
  });

  it('should feedback invalid email', () => {
    const doc = (<HTMLInputElement>document.getElementById('input-email'));
    doc.value = '';
    document.getElementById('register-button').click();
    const result = doc.style.border;
    expect(result).toBe('2px solid rgb(220, 53, 69)');
  });
  it('should feedback invalid password', () => {
    const doc = (<HTMLInputElement>document.getElementById('input-pswd'));
    doc.value = '';
    document.getElementById('register-button').click();
    const result = doc.style.border;
    expect(result).toBe('2px solid rgb(220, 53, 69)');
  });
  it('should feedback invalid repeat password', () => {
    const doc = (<HTMLInputElement>document.getElementById('input-repeat-pswd'));
    doc.value = '';
    document.getElementById('register-button').click();
    const result = doc.style.border;
    expect(result).toBe('2px solid rgb(220, 53, 69)');
  });
});
