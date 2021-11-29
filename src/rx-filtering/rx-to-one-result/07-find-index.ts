// findIndex<T>(
//     predicate: (value: T, index: number, source: Observable<T>) => boolean,
//     thisArg?: any
// ): OperatorFunction<T, number>

import { of } from "rxjs";
import { findIndex } from "rxjs/operators";

// emit index of element which matches the condition
export function findIndexDemo1() {
  const source$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  const stream$ = source$.pipe(findIndex((x) => x > 4 && x % 2 === 0));

  // run(stream$);
}

// emit -1, nothing matches the condition
export function findIndexDemo2() {
  const source$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  const stream$ = source$.pipe(findIndex((x) => x > 40));

  // run(stream$);
}
