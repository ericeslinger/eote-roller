export class Die {
  sides: string[];
  name: string;
  roll() {
    return this.sides[Math.floor(Math.random() * this.sides.length)];
  }
}

export class BoostDie extends Die {
  constructor() {
    super();
    this.name = 'Boost';
    this.sides = [
      'blank',
      'blank',
      'success',
      'success advantage',
      'advantage advantage',
      'advantage advantage'
    ];
  }
}

export class SetbackDie extends Die {
  constructor() {
    super();
    this.name = 'Setback';
    this.sides = [
      'blank',
      'blank',
      'failure',
      'failure',
      'threat',
      'threat'
    ];
  }
}

export class AbilityDie extends Die {
  constructor() {
    super();
    this.name = 'Ability';
    this.sides = [
      'blank',
      'success',
      'success',
      'success success',
      'advantage',
      'advantage',
      'success advantage',
      'advantage advantage'
    ];
  }
}

export class DifficultyDie extends Die {
  constructor() {
    super();
    this.name = 'Difficulty';
    this.sides = [
      'blank',
      'failure',
      'failure failure',
      'threat',
      'threat',
      'threat',
      'threat threat',
      'failure threat'
    ];
  }
}

export class ProficiencyDie extends Die {
  constructor() {
    super();
    this.name = 'Proficiency';
    this.sides = [
      'blank',
      'success',
      'success',
      'success success',
      'success success',
      'advantage',
      'success advantage',
      'success advantage',
      'success advantage',
      'advantage advantage',
      'advantage advantage',
      'triumph',
    ];
  }
}

export class ChallengeDie extends Die {
  constructor() {
    super();
    this.name = 'Challenge';
    this.sides = [
      'blank',
      'failure',
      'failure',
      'failure failure',
      'failure failure',
      'threat',
      'threat',
      'failure threat',
      'failure threat',
      'threat threat',
      'threat threat',
      'despair',
    ];
  }
}

export class ForceDie extends Die {
  constructor() {
    super();
    this.name = 'Force';
    this.sides = [
      'dark',
      'dark',
      'dark',
      'dark',
      'dark',
      'dark',
      'dark dark',
      'light',
      'light',
      'light light',
      'light light',
      'light light',
    ];
  }
}
