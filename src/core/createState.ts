import { Signal, effect, signal } from "@preact/signals-core";
import { produce, type WritableDraft } from "immer";
import type { z } from "zod";

export function createState<T>(initialState: T, schema: z.ZodType<T>) {
  schema.parse(initialState);

  const state = signal(initialState);

  effect(() => {
    schema.parse(state.value);
  });

  function setState(setterFunc: (state: WritableDraft<T>) => void) {
    const newState = produce(state.value, setterFunc);

    state.value = newState;
  }

  return { state, setState };
}
