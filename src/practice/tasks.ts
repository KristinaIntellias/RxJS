import { addItem, run } from "../utils";
import {
  first,
  last,
  elementAt,
  min,
  max,
  find,
  findIndex,
  single,
  filter,
  sample,
  tap,
  sampleTime,
  map,
  audit,
  auditTime,
  throttle,
  throttleTime,
  debounce,
  debounceTime,
  skip,
  skipLast,
  skipUntil,
  skipWhile,
  take,
  pluck,
  takeLast,
  takeUntil,
  startWith,
  takeWhile,
  distinct,
  reduce,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  switchMap,
  withLatestFrom,
  delay,
} from "rxjs/operators";
import { from, fromEvent, fromEventPattern, generate, interval, Observable, of, pairs, range, timer } from "rxjs";
import { ajax } from "rxjs/ajax";

// Task 1. skip()
// Создайте поток из массива чисел от 1 до 10, используя range()
// Получите элементы потока начиная с 3.
(function task1(): void {
  const stream$ = range(1, 10).pipe(skip(3));

  // run(stream$);
})();

// Task 2. skipLast()
// Создайте поток из массива [1, 2, {}], используя from()
// Получите элементы потока без последнего элемента
(function task2(): void {
  const stream$ = from([1, 2]).pipe(skipLast(1));

  // run(stream$);
})();

// Task 3. skipUntil()
// Создайте поток чисел, который выдает их каждую 1с, используя interval().
// Выведите эти числа серым цветом, использыя tap(), addItem(value, {color: '#ccc'})
// Создайте поток собития клик по кнопке runBtn
// Игнорируйте элементы первого потока до клика на кнопке
(function task3(): void {
  const runBtn = document.getElementById("runBtn");
  const clicks$ = fromEvent(runBtn, "click");

  const stream$ = interval(1000).pipe(
    tap((val) => addItem(val, { color: "#ccc" })),
    skipUntil(clicks$)
  );

  // run(stream$);
})();

// Task 4. skipWhile()
// Создайте поток чисел, который выдает их каждую 500мс, используя timer().
// Выведите эти числа серым цветом, использыя tap(), addItem(value, {color: '#ccc'})
// Игнорируйте элементы потока, пока они меньше 10, получите 5 элементов и завершите поток, используя take()
(function task4() {
  // const stream$ =
  // run(stream$);
})();

// Task 5. take()
// Создайте поток собития клик по кнопке runBtn, используя fromEvent()
// Получите метку времени трех кликов, используя pluck() и завершите поток.
(function task5() {
  const clicks$ = fromEvent(document.getElementById("runBtn"), "click");
  const stream$ = fromEvent(document.getElementById("runBtn"), "click").pipe(
    pluck("type"),
    take(3)
  );

  // run(stream$);
})();

// Task 6. takeLast()
// Создайте поток из слов 'Ignore', 'Ignore', 'Hello', 'World!', используя of().
// Модифицируйте поток так, чтобы получить последние два слова в потоке.
// Соберите из них предложение, используя reduce()
(function task6() {
  const stream$ = of("Ignore", "Ignore", "Hello", "World!").pipe(
    takeLast(2),
    reduce((acc, val) => acc + val)
  );

  // run(stream$);
})();

// Task7. takeUntil()
// Создайте поток, который будет выполнять запрос каждую 1с в течении 5с, используя timer()
// и ajax(`https://api.github.com/users?per_page=5`); Время остановки должно формироваться с помощью потока,
// созданого с помощью timer()
// Добавьте в поток ответ запроса, используя pluck().
// Испльзуйте вспомагательный оператор switchMap()
(function task7() {
  const stream$ = timer(0, 1000).pipe(
    switchMap((el) => {
      return ajax(`https://api.github.com/users?per_page=${el}`);
    }),
    pluck("response"),
    takeUntil(timer(5000)),
    reduce((acc, data) => [...acc, ...data], [])
  );

  // run(stream$, { outputMethod: "console" });
})();

// Task 8. takeWhile()
// Создайте поток случайных чисел в диапазоне от 0 до 1, используя Math.random, генератор, from()
// Добавьте в поток в качестве стартового значения 0.11, используя startWith()
// Получайте из потока числа пока они находятся в диапазоне от 0 до 0.7.
// Добавьте в поток также значение, которое нарушило условие.
(function task8() {
  function* generator() {
    while (true) {
      yield Math.random();
    }
  }
  // const stream$ = from(generator())
  //     .pipe(
  //         startWith(0.11),
  //         takeWhile(val => val > 0 && val <= 0.7, true),
  //     )

  // run(stream$);
})();

// Task 9. distinct()
// Создайте массив чисел с дублями, используя from().
// Модифицируйте поток так, чтобы в массиве были уникальные элементы
// Используйте reduce()
(function task9() {
  const res = [];
  const stream$ = from([1, 2, 3, 3, 4, 5, 6, 7, 7, 7, 6, 3, 2]).pipe(
    distinct(),
    reduce((acc, val) => res.push(val))
  );
  // run(stream$);
})();

// Task 10. distinctUntilChanged()
// Реализуйте функцию, которая создает Observable, который будет выдавать в поток значения,
// хранящихся в свойстве sequence класса С, используя generate()
// Модифицируйте поток - уберите повторы в подряд идущих группах, соберите предложение,
// используя reduce()
(function task10() {
  class C<T> {
    private words: T[] = [];

    get size(): number {
      return this.words.length;
    }

    add(elem: T) {
      this.words.push(elem);
      return this;
    }

    get(index: number): T {
      return this.words[index];
    }
  }

  const obj = new C<string>()
    .add("На")
    .add("дворе")
    .add("дворе")
    .add("трава,")
    .add("на")
    .add("траве")
    .add("траве")
    .add("дрова.");

  const stream$ = generate(0, (x) => x < obj.size, (x) => ++x, (x) => obj.get(x)).pipe(
    distinctUntilChanged(),
    reduce((acc, cur) => {
      return `${acc} ${cur}`;
    }, "")
  );

  // run(stream$);
})();

// Task 11. distinctUntilKeyChanged()
// Пусть есть массив объектов. Создайте поток, в котором будут только три объекта, за исключением, второго объекта { name: 'Joe' }.
// Используйте from()
(function task11() {
  const ar = [{ name: "Brian" }, { name: "Joe" }, { name: "Joe" }, { name: "Sue" }];

  const stream$ = from(ar).pipe(distinctUntilKeyChanged("name"));

  // run(stream$);
})();

// Task 12. filter()
// Пусть есть поток objAddressStream, который выдает объект и второй поток skipFieldsStream, который содержит перечень ключей объекта
// Необходимо модифицировать поток так, чтобы он выдавал объект без ключей из второго потока.
// Используйте switchMap, pairs, withLatestFrom, reduce
(function task12() {
  const objAddressStream = of({
    country: "Ukraine",
    city: "Kyiv",
    index: "02130",
    street: "Volodymyra Velikogo",
    build: 100,
    flat: 23,
  });

  const skipFieldsStream$ = from(["build", "flat"]);

  const stream$ = objAddressStream.pipe(
    switchMap((obj) => pairs(obj)),
    withLatestFrom(
      skipFieldsStream$.pipe(
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, [])
      )
    ),
    filter(([el, fields]) => {
      return fields.indexOf(el[0]) === -1;
    }),
    tap((val) => console.log(val)),
    reduce((acc, [val], index) => {
      return { ...acc, [val[0]]: val[1] };
    }, {})
  );
  // run(stream$, { outputMethod: 'console' });
})();

// Task 13. sample()
// Создайте поток, который выдает числа каждую секунду, используя interval(). Выведите эти числа серым цветом,
// использыя tap(), addItem(value, {color: '#ccc'})
// Создайте поток событий 'click' на кнопке, используя fromEventPattern()
// Организуйте получение последнего элемента из первого
// потока во время клика по кнопке
(function task13() {
  const btn = document.getElementById("runBtn");
  const stream$ = interval(1000).pipe(
    tap((val) => addItem(val, { color: "#ccc" })),
    sample(fromEventPattern((handler) => btn.addEventListener("click", handler)))
  );

  // run(stream$);
})();

// Task 14. sampleTime()
// Создайте поток, который выдает числа каждую секунду, используя interval(). Выводите эти числа серым цветом,
// использыя tap(), addItem(value, {color: '#ccc'})
// Модифицируйте данный поток так, чтобы он выдавал последнее число, которое было в потоке
// с периодом 3000мс
(function task14() {
  // const stream$ =
  // run(stream$);
})();

// Task 15. audit()
// Создайте поток, который выдает числа каждые 500мс, используя interval().
// Выводите эти числа серым цветом, использыя tap(), addItem(value, {color: '#ccc'})
// Создайте функцию, которая принимает число и возращает поток, который выдает числа каждую
// 1с, используя interval().
// Модифицируйте первый поток так, чтобы он выдавал значение только спустя время, заданое во
// втором потоке.
(function task15() {
  const stream$ = interval(500).pipe(
    tap((val) => addItem(val, { color: "#ccc" })),
    audit((val) => interval(1000 * val))
  );

  // run(stream$);
})();

// Task 16. auditTime()
// Создайте поток, который выдает числа каждую 1с, используя interval().
// Выводите эти числа серым цветом, использыя tap(), addItem(value, {color: '#ccc'})
// Модифицируйте первый поток так, чтобы он выдавал числи только спустя каждые 3с
(function task16() {
  // const stream$ =
  // run(stream$);
})();

// Task 17. throttle()
// Создайте поток, который выдает числа каждую 1с, используя interval().
// Выводите эти числа серым цветом, использыя tap(), addItem(value, {color: '#ccc'})
// Модифицируйте первый поток так, чтобы он выдавал число, затем выдавал числа с периодом в число * 1000 мс.
(function task17() {
  // const stream$ =
  // run(stream$);
})();

// Task 18. throttleTime()
// Создайте поток объектов события mousemove?  Модифицируйте этот поток так, чтобы он выдал первое значение,
// а потом выдавал значение через каждый 2с
(function task18() {
  // const stream$ =
  // run(stream$, { outputMethod: 'console'});
})();

// Task 19. debounce()
// Создайте поток объектов события mousemove. Модифицируйте этот поток так, чтобы он выдал значение после того,
// как в потоке не будет появляться объект в течении времени заданого с помощью второго потока, например 500мс.
(function task19() {
  // const stream$ =
  // run(stream$, { outputMethod: 'console'});
})();

// Task 20. debounceTime()
// Создайте поток значений поля ввода с id='text-field' для события keyup, используя fromEvent()
// Модифицируйте этот поток так, чтобы он выдавал значение поля ввода после того,
// как в потоке не будет появляться новое значение в течении 500мс.
(function task20() {
  // const stream$ =
  // run(stream$);
})();

// Task 1. concatMap()
// Реализуйте функцию, которая создает Observable, который выдает числа в диапазоне от 1 до 10
// через случайное количество времени в диапазоне от 1с до 5с
// Используйте функцию randomDelay(), of(), concatMap(), delay()
// Проведите эксперимент заменяя метод concatMap на mergeMap, switchMap, exhaustMap
(function task21(): void {
  function randomDelay(min: number, max: number) {
    const pause = Math.floor(Math.random() * (max - min)) + min;
    console.log(pause);
    return pause;
  }

  // const stream$ =

  // run(stream$);
})();

// Task 2. mergeMap()
// Испольуя функцию emulateHttpCall и массив идентификаторов ids
// организуйте получение объектов в параллель.
(function task22(): void {
  function emulateHttpCall(id: number): Observable<any> {
    switch (id) {
      case 1:
        return of({ id: 1, name: "Anna" }).pipe(delay(4000)); // <-- emulation of http call, which returns Observable after 4s
      case 2:
        return of({ id: 2, name: "Boris" }).pipe(delay(3000)); // <-- pause 3s
      case 3:
        return of({ id: 3, name: "Clara" }).pipe(delay(2000)); // <-- pause 2s
    }
  }

  const ids = [1, 3, 2, 2, 3, 3, 1, 2, 3];

  // const stream$ =

  // run(stream$);
})();

// Task 3.1. switchMap()
// Создайте внешний поток, используя fromFetch('https://api.github.com/users?per_page=5')
// Создайте для результата внешнего потока внутренний поток response.json(), используя switchMap()
// Дополнительно фильтруйте элементы внешнего потока по условию response.ok === true
(function task23(): void {
  // const stream$ =
  // run(stream$);
})();

export function runner() {}
