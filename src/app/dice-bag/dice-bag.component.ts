import { Component, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { ability } from '../fancy-dice/abilityDie';
import { boost } from '../fancy-dice/boostDie';
import { challenge } from '../fancy-dice/challengeDie';
import { difficulty } from '../fancy-dice/difficultyDie';
import { force } from '../fancy-dice/forceDie';
import { proficiency } from '../fancy-dice/proficiencyDie';
import { setback } from '../fancy-dice/setbackDie';
import { DiePanelComponent } from '../fancy-dice/die-panel.component';

import { DieResult } from '../fancy-dice/die';

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
  selector: 'dice-bag',
  templateUrl: './dice-bag.component.html',
  styleUrls: ['./dice-bag.component.scss']
})
export class DiceBagComponent {

  ability = ability;
  boost = boost;
  challenge = challenge;
  difficulty = difficulty;
  force = force;
  proficiency = proficiency;
  setback = setback;

  private _roll = new Subject<MouseEvent>();
  private _faceStream = new Subject<DieResult[]>();
  private _result = new BehaviorSubject<PipCount>(Object.assign({}, initialValues));
  private unsubscribes = [];

  rollClick$ = this._roll.asObservable();

  face$ = this.rollClick$
  .mapTo(true)
  .startWith(true)
  .switchMap(() => {
    return this._faceStream.asObservable()
    .mergeMap(v => Observable.from(v as DieResult[]))
    .scan((current, face) => current.concat(face), []);
  });

  result$ = this.face$
  .map((v) => {
    return v.reduce((current: PipCount, face: DieResult) => {
      const retVal = Object.assign({}, current);
      face.face.forEach(k => retVal[k] = retVal[k] + 1);
      return retVal;
    }, Object.assign({}, initialValues));
  })
  .startWith(Object.assign({}, initialValues));

  pipsRolled(val: DieResult[]) {
    this._faceStream.next(val);
  }

  doRoll(evt: MouseEvent) {
    this._roll.next(evt);
  }
}
