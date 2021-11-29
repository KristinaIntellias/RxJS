// find<T>(
//     predicate: (value: T, index: number, source: Observable<T>) => boolean,
//     thisArg?: any
// ): OperatorFunction<T, T | undefined>

import { from, of } from "rxjs";
import { find, pluck } from "rxjs/operators";

// find searches for the first item in the source Observable
// that matches the specified condition
export function findDemo1() {
  const source$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  const stream$ = source$.pipe(find((x) => x > 4 && x % 2 === 0));

  // run(stream$); // 6
}

// emit undefined if nothing matches the condition
export function findDemo2() {
  const source$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  const stream$ = source$.pipe(find((x) => x > 40));

  // run(stream$); // undefined
}

// find + object (Maksym Koval1)
// Дано поток пользователей желающих зарегестрироваться на веббинар Виталия,
// однако к-во мест ограничено. На веббинар может попасть только 1 человек уровня senior.
// Просмотреть все заявки и после того, как встретится первый разработчик уровня senior -
// закрыть регистрацию на веббинар (поток) и вывести его имя
export function findDemo3() {
  const searchTitle = "Senior";
  const candidates$ = from([
    {
      title: "Junior",
      name: "Andrii",
    },
    {
      title: "Junior",
      name: "Anna",
    },
    {
      title: "Senior",
      name: "Gorge",
    },
    {
      title: "Middle",
      name: "Greg",
    },
  ]);

  const stream$ = candidates$.pipe(
    find(({ title }) => title === searchTitle),
    pluck("name")
  );

  // run(stream$);
}
