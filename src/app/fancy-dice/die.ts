function randItem(ary: any[]) {
  return ary[Math.floor(Math.random() * ary.length)];
}

export function roll(sides: any[]) {
  return sides[Math.floor(Math.random() * sides.length)];
}

export class Die {
  constructor(public sides: string[][]) {}
  roll() {
    return randItem(this.sides);
  }
}
