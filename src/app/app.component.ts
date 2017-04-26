import { Component } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { ability, boost, challenge, difficulty, force, proficiency, setback } from './die-panel/diceData';

import { DiePanelComponent } from './die-panel/die-panel.component';

import { DieResult } from './die-panel/die';

interface PipCount {
  success: number;
  failure: number;
  advantage: number;
  blank: number;
  threat: number;
  despair: number;
  dark: number;
  light: number;
  triumph: number;
}

const initialValues: PipCount = {
  success: 0,
  failure: 0,
  advantage: 0,
  blank: 0,
  threat: 0,
  despair: 0,
  dark: 0,
  light: 0,
  triumph: 0
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ability = ability;
  boost = boost;
  challenge = challenge;
  difficulty = difficulty;
  force = force;
  proficiency = proficiency;
  setback = setback;
  // @ViewChildren(DiePanelComponent) dicePanels: QueryList<DiePanelComponent>;
  dice$: Observable<DieResult[]>;

  private _control = new Subject<{type: string, e: MouseEvent}>();
  private _faceStream = new Subject<DieResult[]>();
  private _result = new BehaviorSubject<PipCount>(Object.assign({}, initialValues));
  private unsubscribes = [];

  control$ = this._control.asObservable();

  face$ = this.control$
  .filter(v => v.type === 'roll')
  .mapTo(true)
  .startWith(true)
  .switchMap(() => {
    return this._faceStream.asObservable()
    .mergeMap(v => Observable.from(v as DieResult[]))
    .scan((current, face) => current.concat(face), []);
  })
  .share();

  result$ = this.face$
  .map((v) => {
    return v.reduce((current: PipCount, face: DieResult) => {
      const retVal = Object.assign({}, current);
      face.face.forEach(k => retVal[k] = retVal[k] + 1);
      return retVal;
    }, Object.assign({}, initialValues));
  })
  .startWith(Object.assign({}, initialValues));

  success$ = this.result$
  .map(v => v.success + v.triumph - v.failure - v.despair);

  advantage$ = this.result$
  .map(v => v.advantage - v.threat);

  triumph$ = this.result$
  .map(v => v.triumph);

  despair$ = this.result$
  .map(v => v.despair);

  pipsRolled(val: DieResult[]) {
    this._faceStream.next(val);
  }

  doRoll(evt: MouseEvent) {
    this._control.next({ type: 'roll', e: evt });
  }
  doReset(evt: MouseEvent) {
    this._control.next({ type: 'reset', e: evt });
  }

  // ngAfterViewInit() {
  //   this.dice$ = Observable.merge( ...this.dicePanels.toArray().map(dp => dp.value$) );
  // }
}
