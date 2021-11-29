import {
  skipDemo,
  skipLastDemo1,
  skipLastDemo2,
  skipUntilDemo,
  skipWhileDemo,
  takeDemo,
  takeLastDemo1,
  takeLastDemo2,
  takeLastDemo3,
  takeUntilDemo,
  takeWhileDemo1,
  takeWhileDemo2,
  distinctDemo1,
  distinctDemo2,
  distinctDemo3,
  distinctUntilChangedDemo1,
  distinctUntilChangedDemo2,
  distinctUntilKeyChangedDemo1,
  distinctUntilKeyChangedDemo2,
  filterDemo,
  sampleDemo,
  auditTimeDemo,
  auditDemo,
  debounceTimeDemo,
  sampleTimeDemo,
  throttleDemo2,
  throttleDemo1,
  throttleDemo3,
  throttleTimeDemo1,
  throttleTimeDemo2,
  elementAtDemo1,
  elementAtDemo2,
  elementAtDemo3,
  elementAtDemo4,
  findDemo1,
  findDemo2,
  findDemo3,
  findIndexDemo1,
  findIndexDemo2,
  firstDemo1,
  firstDemo2,
  firstDemo3,
  firstDemo4,
  ignoreElementsDemo1,
  ignoreElementsDemo2,
  lastDemo1,
  lastDemo2,
  lastDemo3,
  lastDemo4,
  lastDemo5,
  maxDemo1,
  maxDemo2,
  maxDemo3,
  minDemo1,
  minDemo2,
  minDemo3,
  singleDemo1,
  singleDemo2,
  singleDemo3,
  singleDemo4,
  singleDemo5,
} from "./rx-filtering";
import { debounceDemo } from "./rx-filtering/19-debounce";
import { runner } from "./practice/tasks";
import { subjectsRunner } from "./rx-subjects/subjects";
import { mapDemo } from "./rx-higher-order-observables";

// to multiple result filter
skipDemo();
skipLastDemo1();
skipLastDemo2();
skipUntilDemo();
skipWhileDemo();

takeDemo();
takeLastDemo1();
takeLastDemo2();
takeLastDemo3();
takeUntilDemo();
takeWhileDemo1();
takeWhileDemo2();

distinctDemo1();
distinctDemo2();
distinctDemo3();

distinctUntilChangedDemo1();
distinctUntilChangedDemo2();

distinctUntilKeyChangedDemo1();
distinctUntilKeyChangedDemo2();

filterDemo();

sampleDemo();
sampleTimeDemo();

auditDemo();
auditTimeDemo();

throttleDemo1();
throttleDemo2();
throttleDemo3();
throttleTimeDemo1();
throttleTimeDemo2();

debounceDemo();
debounceTimeDemo();
// to one result filter
firstDemo1();
firstDemo2();
firstDemo3();
firstDemo4();

lastDemo1();
lastDemo2();
lastDemo3();
lastDemo4();
lastDemo5();

elementAtDemo1();
elementAtDemo2();
elementAtDemo3();
elementAtDemo4();

minDemo1();
minDemo2();
minDemo3();

maxDemo1();
maxDemo2();
maxDemo3();

findDemo1();
findDemo2();
findDemo3();

findIndexDemo1();
findIndexDemo2();

singleDemo1();
singleDemo2();
singleDemo3();
singleDemo4();
singleDemo5();

ignoreElementsDemo1();
ignoreElementsDemo2();

runner();
subjectsRunner();
mapDemo();
