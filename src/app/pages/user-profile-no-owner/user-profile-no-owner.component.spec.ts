import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileNoOwnerComponent } from './user-profile-no-owner.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

/**
 * Test the correct function of the component UserProfile
 */
describe('UserProfileComponent', () => {
  let component: UserProfileNoOwnerComponent;
  let fixture: ComponentFixture<UserProfileNoOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ UserProfileNoOwnerComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileNoOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifies that the component in correctly loaded.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
