import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVideoComponent } from './view-video.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * Unit test of ViewVideoComponent
 */
describe('ViewVideoComponent', () => {
  let component: ViewVideoComponent;
  let fixture: ComponentFixture<ViewVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVideoComponent);
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
   * Test that the button get more videos is not showing
   */
  it('should not show the button that get more videos', () => {
    expect(document.getElementById('btn-get-videos').hidden).toBeFalse();
    component.moreVideos = false;
    fixture.detectChanges();
    expect(document.getElementById('btn-get-videos').hidden).toBeTrue();
  });

  /**
   * Test that show correctly the option get more videos
   */
  it('should show the button that get more videos', () => {
    expect(document.getElementById('btn-get-videos').hidden).toBeFalse();
    component.moreVideos = true;
    fixture.detectChanges();
    expect(document.getElementById('btn-get-videos').hidden).toBeFalse();
  });
});
