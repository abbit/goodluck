import * as base64url from "@iamabbit/base64url";
import { deflateRaw, inflateRaw } from "pako";
import Fraction from "fraction.js";

export type Option = {
  label: string;
  weight: Fraction;
};

export type State = {
  title: string;
  options: Option[];
};

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export const serializeState = (state: State): string =>
  base64url.encode(deflateRaw(textEncoder.encode(JSON.stringify(state))));

export const deserializeState = (str: string): State => {
  // this is not a real state object yet, because weights are not Fractions
  const obj = JSON.parse(
    textDecoder.decode(inflateRaw(base64url.decode(str))),
  ) as State;

  return {
    ...obj,
    options: obj.options.map((opt) => ({
      ...opt,
      weight: new Fraction(opt.weight.n, opt.weight.d),
    })),
  };
};

export const initState = (): State => ({
  title: "",
  options: [
    {
      label: "1",
      weight: new Fraction(1),
    },
  ],
});

export const setTitle = (state: State, title: string): State => ({
  ...state,
  title,
});

export const addOption = (state: State): State => ({
  ...state,
  options: [
    ...state.options,
    { label: (state.options.length + 1).toString(), weight: new Fraction(0) },
  ],
});

export const removeOption = (state: State, index: number): State => ({
  ...state,
  options: state.options.filter((_, i) => i !== index),
});

export const setOptionLabel = (
  state: State,
  index: number,
  label: string,
): State => ({
  ...state,
  options: state.options.map((opt, i) =>
    i === index ? { ...opt, label } : opt,
  ),
});

export const setOptionWeight = (
  state: State,
  index: number,
  weight: Fraction,
): State => ({
  ...state,
  options: state.options.map((opt, i) =>
    i === index ? { ...opt, weight } : opt,
  ),
});

export function setEqualWeights(state: State, isEqual: boolean): State {
  if (isEqual) {
    const optionsWithEqualWeights = state.options.map((opt) => ({
      ...opt,
      weight: new Fraction(1),
    }));

    return {
      ...state,
      options: optionsWithEqualWeights,
    };
  }

  return {
    ...state,
  };
}

export const getTotalWeight = (state: State): Fraction =>
  state.options.reduce(
    (sum, option) => sum.add(option.weight),
    new Fraction(0),
  );

export const selectRandomOption = (state: State): Option => {
  const totalWeight = getTotalWeight(state);

  let randFunc = Math.random;
  if (window.crypto && window.crypto.getRandomValues) {
    // if we have a cryptographically secure random number generator, use it
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    randFunc = () => array[0] / 4294967295;
  }

  let randomWeight = new Fraction(randFunc()).mul(totalWeight);
  for (const option of state.options) {
    if (randomWeight.compare(option.weight) < 0) {
      return option;
    }

    randomWeight = randomWeight.sub(option.weight);
  }

  // this should never happen
  throw new Error("No option selected");
};
