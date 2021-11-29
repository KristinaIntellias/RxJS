import { ajax } from "rxjs/ajax";
import { fromEvent, interval, of } from "rxjs";
import {
  catchError,
  concatMap,
  concatMapTo,
  delay,
  distinctUntilChanged,
  exhaustMap,
  finalize,
  map,
  mergeMap,
  pluck,
  switchMap,
  switchMapTo,
  take,
  tap,
  throttleTime,
} from "rxjs/operators";
import { run } from "../utils";

const targetInput = document.getElementById("text-field");
const httpSubject$ = ajax(`https://www.boredapi.com/api/activity`);
let counter = 1000;

(function switchMapDemo() {
  const stream = fromEvent(targetInput, "change").pipe(
    map(() => ++counter),
    distinctUntilChanged(),
    delay(100),
    switchMap((counter: number) => httpSubject$),
    pluck("response"),
    catchError((error) => of(error)),
    finalize(() => console.log("stream completed"))
  );

  run(stream, { outputMethod: "console" });
});

(function concatMapDemo() {
  const stream = fromEvent(targetInput, "change").pipe(
    map(() => ++counter),
    distinctUntilChanged(),
    delay(100),
    concatMap((counter: number) => httpSubject$),
    // concatMapTo(httpSubject$),
    pluck("response"),
    catchError((error) => of(error)),
    finalize(() => console.log("stream completed"))
  );

  run(stream, { outputMethod: "console" });
});

(function exhaustMapDemo() {
  // const stream = interval(1000).pipe(
  const stream = fromEvent(targetInput, "change").pipe(
    distinctUntilChanged(),
    delay(100),
    tap((e) => console.log(e)),
    // take(4),
    exhaustMap((counter: any) => httpSubject$),
    pluck("response"),
    catchError((error) => of(error)),
    finalize(() => console.log("stream completed"))
  );

  run(stream, { outputMethod: "console" });
});

(function mergeMapDemo() {
  const stream = fromEvent(targetInput, "change").pipe(
    distinctUntilChanged(),
    delay(100),
    tap((e) => console.log(e)),
    mergeMap((counter: any) => httpSubject$),
    pluck("response"),
    catchError((error) => of(error)),
    finalize(() => console.log("stream completed"))
  );

  run(stream, { outputMethod: "console" });
});

export function mapDemo() {}
