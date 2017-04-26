import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'plus-minus',
  templateUrl: './plus-minus.component.html',
  styleUrls: ['./plus-minus.component.scss']
})
export class PlusMinusComponent implements OnInit, OnDestroy {

  private subscription;
  @Input() maxValue: number;
  @Input() minValue: number;
  @Output() count = new EventEmitter<number>();
  controls = new Subject<number>();
  value$: Observable<number>;
  // constructor() { }

  controlClick(v) {
    this.controls.next(v);
  }

  ngOnInit() {
    this.value$ = this.controls.asObservable()
    .scan((current, value) => Math.min(this.maxValue, Math.max(this.minValue, current + value)), this.minValue)
    .distinctUntilChanged()
    .share()
    .startWith(this.minValue);

    this.subscription = this.value$.subscribe(v => this.count.emit(v));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
