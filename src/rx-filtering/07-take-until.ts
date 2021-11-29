import { fromEvent } from "rxjs";
// takeUntil<T>(
//      notifier: Observable<any>
// ): MonoTypeOperatorFunction<T>

import { timer, interval } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
import { run } from "../utils/run";

export function takeUntilDemo() {
  const period = 1000;
  const dueTime = 2000;

  const source$ = interval(period);
  // const stopSignal$ = timer(dueTime).pipe(take(1));
  const stopSignal$ = fromEvent(document.getElementById("runBtn"), "click");

  // Emit values until provided observable emits.
  const stream$ = source$.pipe(takeUntil(stopSignal$));
  // run(stream$);
}
