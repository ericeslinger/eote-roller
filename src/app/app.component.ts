import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MdButton } from '@angular/material';
import { Observable } from 'rxjs';
import { PlusMinusComponent } from './plus-minus/plus-minus.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('pm') plusMinus: PlusMinusComponent;
  @ViewChild('rollButton') roller: MdButton;
  title = 'app works!';
  runStream;
  ngAfterViewInit() {
    this.runStream = Observable.combineLatest(
      this.plusMinus.count$,
      Observable.fromEvent<MouseEvent>(this.roller._getHostElement(), 'click')
    ).distinctUntilChanged((x, y) => x[1] === y[1]);
    this.runStream.subscribe(v => console.log(v));
  }
}
