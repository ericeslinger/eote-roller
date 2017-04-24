import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('pm') plusMinus;
  title = 'app works!';
  ngAfterViewInit() {
    this.plusMinus.count$.subscribe(v => console.log('SUB', v));
  }
}
