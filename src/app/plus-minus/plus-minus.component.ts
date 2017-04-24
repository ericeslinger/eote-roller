import { Component, OnInit, ViewChild, ElementRef, Input, Output } from '@angular/core';
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
  @Input() maxValue: number;
  @Input() minValue: number;
  @Output() count: Observable<number>;
  count$: Observable<number>;

  // constructor() { }

  ngOnInit() {
    this.count$ = Observable.merge(
      Observable.fromEvent<MouseEvent>(this.plus._getHostElement(), 'click') .mapTo(+1),
      Observable.fromEvent<MouseEvent>(this.minus._getHostElement(), 'click') .mapTo(-1)
    )
    .scan((current, value) => Math.min(this.maxValue, Math.max(this.minValue, current + value)), this.minValue)
    .distinctUntilChanged()
    .share()
    .startWith(this.minValue);
  }

}
