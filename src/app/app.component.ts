import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  dice$ = new Subject();
  rollStream = this.dice$.asObservable();
  onClick() {
    this.dice$.next(Math.floor(Math.random() * 6) + 1);
    console.log('cleek');
  }
}
