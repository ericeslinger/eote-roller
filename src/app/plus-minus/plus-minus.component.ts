import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MdButton } from '@angular/material';

@Component({
  selector: 'plus-minus',
  templateUrl: './plus-minus.component.html',
  styleUrls: ['./plus-minus.component.scss']
})
export class PlusMinusComponent implements OnInit {

  @ViewChild('plus') plus: MdButton;
  @ViewChild('minus') minus: MdButton;

  currentValue: number;
  count$: Observable<number>;

  constructor() {
    this.currentValue = 0;
  }

  ngOnInit() {
    this.count$ = Observable.merge(
      // decrement
      Observable.fromEvent<MouseEvent>(this.plus._getHostElement(), 'click')
        .map(() => ({ delta : +1 }) ),

      // increment
      Observable.fromEvent<MouseEvent>(this.minus._getHostElement(), 'click')
        .map(() => ({ delta : -1 }) ),

      // reset
      // Observable.fromEvent($('#res'), 'click')
      //   .map(() => ({ return {reset : true)))
    ) // merge
    .scan((current, value) => Math.max(0, current + value.delta), 0)
    .startWith(0);
  }

}
