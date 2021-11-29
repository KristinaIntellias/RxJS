import { AsyncSubject, BehaviorSubject, interval, ReplaySubject, Subject } from "rxjs";

type subjectT = number | string;

(function SubjectDemo() {
  console.log("-----------------------------------SubjectDemo---------------------------------------");
  const subject$ = new Subject<subjectT>();
  // stream$ is a partial part of subject
  const stream$ = subject$.asObservable();

  subject$.next(1);
  stream$.subscribe((e) => {
    console.log("Subject-Subscriber 1 got result: ", e);
  });

  subject$.next(2);

  setTimeout(() => {
    stream$.subscribe((e) => {
      console.log("Subject-Subscriber 2 got result: ", e);
    });

    subject$.next(5);
  }, 3000);

  subject$.next(3);
  subject$.next(4);
});

(function BehaviorSubjectDemo() {
  console.log("------------------------------BehaviorSubjectDemo-----------------------------------");
  const subject$ = new BehaviorSubject<subjectT>(0);
  // stream$ is a partial part of subject
  const stream$ = subject$.asObservable();

  subject$.next(1);

  stream$.subscribe((e) => {
    console.log("BehaviorSubject-Subscriber 1 got result: ", e);
  });

  subject$.next(2);

  setTimeout(() => {
    stream$.subscribe((e) => {
      console.log("BehaviorSubject-Subscriber 2 got result: ", e);
    });
    subject$.next(5);
  }, 3000);

  subject$.next(3);
  subject$.next(4);
});

(function ReplaySubjectDemo() {
  console.log("------------------------------ReplaySubject-----------------------------------");
  const subject$ = new ReplaySubject<subjectT>();
  // use buffer value
  // const subject$ = new ReplaySubject<subjectT>(2);
  // stream$ is a partial part of subject
  const stream$ = subject$.asObservable();

  subject$.next(1);

  stream$.subscribe((e) => {
    console.log("ReplaySubject-Subscriber 1 got result: ", e);
  });

  subject$.next(2);

  setTimeout(() => {
    stream$.subscribe((e) => {
      console.log("ReplaySubject-Subscriber 2 got result: ", e);
    });
    subject$.next(5);
  }, 3000);

  subject$.next(3);
  subject$.next(4);
});

(function AsyncSubjectDemo() {
  console.log("------------------------------AsyncSubjectDemo-----------------------------------");
  const subject$ = new AsyncSubject<subjectT>();

  // stream$ is a partial part of subject
  const stream$ = subject$.asObservable();

  subject$.next(1);

  stream$.subscribe((e) => {
    console.log("AsyncSubject-Subscriber 1 got result: ", e);
  });

  subject$.next(2);

  setTimeout(() => {
    stream$.subscribe((e) => {
      console.log("AsyncSubject-Subscriber 2 got result: ", e);
    });

    subject$.next(5);
    subject$.complete();
  }, 3000);

  subject$.next(3);
  subject$.next(4);
});

export function subjectsRunner() {}
