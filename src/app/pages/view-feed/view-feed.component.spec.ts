import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedComponent } from './view-feed.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * Test the correct function of the component ViewFeed
 */
describe('ViewFeedComponent', () => {
  let component: ViewFeedComponent;
  let fixture: ComponentFixture<ViewFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ ViewFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifies that the component in correctly loaded.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test that the button get more videos of the feed is not showing
   */
  it('should not show the button that get more videos of the feed', () => {
    expect(document.getElementById('btn-get-feed').hidden).toBeFalse();
    component.moreFeed = false;
    fixture.detectChanges();
    expect(document.getElementById('btn-get-feed').hidden).toBeTrue();
  });

  /**
   * Test that show correctly the option get more videos of the feed
   */
  it('should show the button that get more videos of the feed', () => {
    expect(document.getElementById('btn-get-feed').hidden).toBeFalse();
    component.moreFeed = true;
    fixture.detectChanges();
    expect(document.getElementById('btn-get-feed').hidden).toBeFalse();
  });
});
