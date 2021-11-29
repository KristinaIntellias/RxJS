// min<T>(
//     comparer?: (x: T, y: T) => number
// ): MonoTypeOperatorFunction<T>

import { of, timer } from "rxjs";
import { min, tap, timeout } from "rxjs/operators";

// emit min value from series of numbers
export function minDemo1() {
  const source$ = of(5, 4, 7, 2, 8);
  const stream$ = source$.pipe(min());

  // run(stream$);
}

// Use a comparer function to get the minimal item
export function minDemo2() {
  interface Person {
    age: number;
    name: string;
  }

  const source$ = of<Person>({ age: 7, name: "Anna" }, { age: 5, name: "Boris" }, { age: 9, name: "Clara" });

  const stream$ = source$.pipe(min((a: Person, b: Person) => (a.age < b.age ? -1 : 1)));

  // run(stream$);
}

// doesn't work with infinite series of numbers
export function minDemo3() {
  const source$ = timer(0, 1000);
  const stream$ = source$.pipe(
    tap((val) => console.log("Current Value: ", val)),
    min(),
    timeout(5000) // <-- causes error after 5s
  );

  // run(stream$);
}
