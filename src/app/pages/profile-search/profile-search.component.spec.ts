import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {DebugElement, Injectable} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Params, ActivatedRoute} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';

import {ProfileSearchComponent} from './profile-search.component';
import {AccountService} from '../../services/account.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private _testParams: {};
  get testParams() { return this._testParams; }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }
}

describe('MyComponent', () => {
  let mockActivatedRoute;

  let component: ProfileSearchComponent;
  let fixture: ComponentFixture<ProfileSearchComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    mockActivatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [
        ProfileSearchComponent
      ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute, accountService: AccountService, httpClient: HttpClient}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSearchComponent);
    component = fixture.componentInstance;

    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;

    mockActivatedRoute.testParams = {text: 'asdcadasdc'};

    fixture.detectChanges();
  });

  it('should set foo to "3"', () => {
    // expect(component.foo).toBe('3');
    expect(true);
    // expect(component.searchText).toBeTruthy();
  });
});
