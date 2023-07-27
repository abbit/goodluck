import * as base64url from "@iamabbit/base64url";
import { deflateRaw, inflateRaw } from "pako";

export type Option = {
  label: string;
  chance: string;
};

export type State = {
  title: string;
  isChancesEqual: boolean;
  options: Option[];
};

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export const serializeState = (state: State): string =>
  base64url.encode(deflateRaw(textEncoder.encode(JSON.stringify(state))));

export const deserializeState = (str: string): State =>
  JSON.parse(textDecoder.decode(inflateRaw(base64url.decode(str)))) as State;

export function initState() {
  return {
    title: "",
    isChancesEqual: false,
    options: [
      {
        label: "",
        chance: "0",
      },
    ],
  };
}

export function addOption(state: State): State {
  const newOptions = [...state.options, { label: "", chance: "0" }];

  return {
    ...state,
    options: newOptions,
  };
}

export function removeOption(state: State, index: number): State {
  const newOptions = state.options.filter((_, i) => i !== index);

  return {
    ...state,
    options: newOptions,
  };
}

export function setIsChancesEqual(
  state: State,
  isChancesEqual: boolean,
): State {
  if (isChancesEqual) {
    const equalChance = 1 / state.options.length;
    const optionsWithEqualChance = state.options.map((opt) => ({
      ...opt,
      chance: (equalChance * 100).toFixed(2),
    }));

    return {
      ...state,
      isChancesEqual: true,
      options: optionsWithEqualChance,
    };
  }

  return {
    ...state,
    isChancesEqual: false,
  };
}

export function getTotalChance(state: State): number {
  if (state.isChancesEqual) {
    return 100;
  }

  return state.options.reduce((sum, option) => {
    return sum + parseFloat(option.chance);
  }, 0);
}
