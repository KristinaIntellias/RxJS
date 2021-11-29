// first<T, D>(
//     predicate?: (value: T, index: number, source: Observable<T>) => boolean,
//     defaultValue?: D
// ): OperatorFunction<T, T | D>

import { of } from "rxjs";
import { first } from "rxjs/operators";

// emit only the first value
export function firstDemo1() {
  const source$ = of(0, 1, 2, 3, 4, 5);

  const stream$ = source$.pipe(first());
  // run(stream$);
}

// first + predicate function
export function firstDemo2() {
  const $source = of(1, 3, 5, 10);
  const stream$ = $source.pipe(first((n) => n % 2 === 0));
  // run(stream$);
}

// no value causes an error
export function firstDemo3() {
  const source$ = of(1, 2, 3, 4, 5);
  const stream$ = source$.pipe(first((n) => n > 250));
  // run(stream$);
}

// if no value, use default
export function firstDemo4() {
  const source$ = of(1, 2, 3, 4, 5);
  const stream$ = source$.pipe(first((n) => n > 250, 1000));
  // run(stream$);
}
