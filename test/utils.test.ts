import { it, expect } from "vitest";
import { isPlainObject } from "../src/_utils";

it("isPlainObject", () => {
  expect(isPlainObject(undefined)).toBe(false);
  expect(isPlainObject(0)).toBe(false);
  expect(isPlainObject(0n)).toBe(false);
  expect(isPlainObject("")).toBe(false);
  expect(isPlainObject(true)).toBe(false);
  expect(isPlainObject(Symbol(""))).toBe(false);
  expect(isPlainObject(() => {})).toBe(false);
  expect(isPlainObject(function namedFunc() {})).toBe(false);
  expect(isPlainObject(null)).toBe(false);
  expect(isPlainObject({})).toBe(true);
  expect(isPlainObject(Math)).toBe(false);
  expect(isPlainObject(new Set([]))).toBe(false);
  expect(isPlainObject(new ArrayBuffer(0))).toBe(false);
  expect(isPlainObject(Promise.resolve())).toBe(false);
  expect(isPlainObject(Object.create(null))).toBe(true);
  expect(isPlainObject(new Intl.Locale("en"))).toBe(false);
  // eslint-disable-next-line no-new-object
  expect(isPlainObject(new Object({ prop: true }))).toBe(true);
  expect(isPlainObject(new (class Class {})())).toBe(false);
  expect(isPlainObject([])).toBe(false);
  expect(isPlainObject(/regexp/)).toBe(false);
  expect(isPlainObject(new Error("test"))).toBe(false);
  expect(isPlainObject(new Date())).toBe(false);
  expect(
    isPlainObject(
      (function () {
        // eslint-disable-next-line prefer-rest-params
        return arguments;
      })(),
    ),
  ).toBe(false);
  // expect(isPlainObject(new Proxy({}, {}))).toBe(false); // TODO
});
