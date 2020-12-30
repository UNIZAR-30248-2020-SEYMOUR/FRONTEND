import {Component, Input, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() editable: boolean;
  @Input() currentRate: number;

  @Output() ratingChange = new EventEmitter<object>();
  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Sets the new rate and notifies to the father component.
   * @param currentRate New rating value.
   */
  addRate(currentRate: any) {
    this.currentRate = currentRate;
    this.ratingChange.emit(currentRate);
  }
}
