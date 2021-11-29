// last<T, D>(
//     predicate?: (value: T, index: number, source: Observable<T>) => boolean,
//     defaultValue?: D
// ): OperatorFunction<T, T | D>

import { range, timer } from "rxjs";
import { last, timeout } from "rxjs/operators";

// options for range() function
const start = 1;
const count = 100;

// emit only the last value
export function lastDemo1() {
  const source$ = range(start, count);
  const stream$ = source$.pipe(last());
  // run(stream$);
}

// last + predicate function
export function lastDemo2() {
  const source$ = range(start, count);
  const stream$ = source$.pipe(last((n) => n < 50));
  // run(stream$);
}

// no value causes an error
export function lastDemo3() {
  const source$ = range(start, count);
  const stream$ = source$.pipe(last((n) => n > 500));

  // output: Error: EmptyError: no elements in sequence
  // run(stream$);
}

// if no value, use default
export function lastDemo4() {
  const source$ = range(start, count);
  const stream$ = source$.pipe(last((n) => n > 500, 1000));
  // run(stream$);
}

// infinite stream, no value
export function lastDemo5() {
  const dueTime = 0;
  const period = 100;
  const source$ = timer(dueTime, period);
  const stream$ = source$.pipe(
    last(),
    timeout(5000) // <-- causes error after 5s
  );
  // run(stream$);
}
