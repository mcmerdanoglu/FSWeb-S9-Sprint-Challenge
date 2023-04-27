import AppFunctional from "./AppFunctional";
import React from "react";
import { render, screen } from "@testing-library/react";

// Write your tests here
test("sanity", () => {
  expect(true).toBe(/*false*/ true);
});

test("Hatasız render oluyor mu?", () => {
  render(<AppFunctional />);
});

test("email alanı var mı?", async () => {
  render(<AppFunctional />);
  const email = expect(screen.getByTestId("email"));
  expect(email).toBeInTheDocument;
});

test("sol yön butonu render oluyor mu?", () => {
  render(<AppFunctional />);
  const left = expect(screen.getByTestId("left"));
  expect(left).toBeInTheDocument;
});

test("sağ yön butonu render oluyor mu?", () => {
  render(<AppFunctional />);
  const right = expect(screen.getByTestId("right"));
  expect(right).toBeInTheDocument;
});

test("yukarı yön butonu render oluyor mu?", () => {
  render(<AppFunctional />);
  const up = expect(screen.getByTestId("up"));
  expect(up).toBeInTheDocument;
});

test("aşağı yön butonu render oluyor mu?", () => {
  render(<AppFunctional />);
  const down = expect(screen.getByTestId("down"));
  expect(down).toBeInTheDocument;
});

test("reset butonu render oluyor mu?", () => {
  render(<AppFunctional />);
  const reset = expect(screen.getByTestId("reset"));
  expect(reset).toBeInTheDocument;
});
