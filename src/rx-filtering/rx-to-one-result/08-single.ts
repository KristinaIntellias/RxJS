// single<T>(
//     predicate?: (value: T, index: number, source: Observable<T>) => boolean
// ): MonoTypeOperatorFunction<T>

import { range, EMPTY } from "rxjs";
import { single } from "rxjs/operators";

// options for range() function
const start = 1;
const count = 100;

// emit the first value to cause the predicate function to be true
export function singleDemo1() {
  const source$ = range(start, count);
  const stream$ = source$.pipe(single((n) => n === 50));

  // run(stream$); // output: Next: 50;
}

// emit error, more than one element
export function singleDemo2() {
  const source$ = range(start, count);
  const stream$ = source$.pipe(single((n) => n > 50));

  // run(stream$); // output: Error: Sequence contains more than one element
}

// emit error, more than one element
export function singleDemo3() {
  const source$ = range(start, count);
  const stream$ = source$.pipe(single()); // w/o predicate

  // run(stream$); // output: Error: Sequence contains more than one element
}

// emit error, no elements in sequence
export function singleDemo4() {
  const source$ = EMPTY;
  const stream$ = source$.pipe(single((n) => n > 50));

  // run(stream$); // output: Error: EmptyError: no elements in sequence
}

// emit undefined, no elements match the predicate function
export function singleDemo5() {
  const source$ = range(start, count);
  const stream$ = source$.pipe(single((n) => n > 100));

  // run(stream$); // output: Next: undefined
}
