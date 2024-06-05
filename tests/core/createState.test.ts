import { test, expect } from "vitest";
import { createState } from "../../src/core/createState";
import { z } from "zod";

test("Should create and update state", () => {
  const initialState = { name: "Test" };
  const { state, setState } = createState(
    initialState,
    z.object({ name: z.string() })
  );

  expect(state.value).toBe(initialState);

  setState((d) => {
    d.name = "Updated";
  });

  expect(state.value.name).toBe("Updated");
});

test("Should error creating state", () => {
  const initialState = { name: "" };

  expect(() =>
    createState(initialState, z.object({ name: z.string().min(1) }))
  ).toThrowError();
});

test("Should error updating state", () => {
  const initialState = { name: "Test" };
  const { setState } = createState(
    initialState,
    z.object({ name: z.string().min(1) })
  );

  expect(() => {
    setState((d) => {
      d.name = "";
    });
  }).toThrowError();
});
