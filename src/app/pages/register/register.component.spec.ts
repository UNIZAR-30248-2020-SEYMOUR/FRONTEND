import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

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

  it('should create', () => {
    (<HTMLInputElement>document.getElementById('input-username')).value = '';
     document.getElementById('register-button').click();
     alert(document.getElementById('register-button').textContent);
     alert((<HTMLSpanElement>document.getElementById('required-username-feedback')).innerText);
     const result = (<HTMLDivElement>document.getElementById('required-username-feedback')).innerText;
    expect(result).toBe('El nombre es necesario');
  });
});
