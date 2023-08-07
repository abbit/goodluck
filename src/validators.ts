import type { Option, State } from "./state";

export enum StateValidationStatus {
  Valid = "Valid",
  ErrorTitle = "ErrorTitle",
  ErrorOptionsLength = "ErrorOptionsLength",
  ErrorOptionsLabels = "ErrorOptionsLabels",
  ErrorNegativeWeights = "ErrorNegativeWeights",
}

export const StateValidationErrors: Record<StateValidationStatus, string> = {
  Valid: "",
  ErrorTitle: "Please, enter a title",
  ErrorOptionsLength: "There must be at least 1 option",
  ErrorOptionsLabels: "Please, enter a label's for all options",
  ErrorNegativeWeights: "Weights must be non-negative",
};

const validateTitle = (title: string): boolean => title !== "";

const validateOptionsLength = (options: Option[]): boolean =>
  options.length !== 0;

const validateOptionsLabels = (options: Option[]): boolean => {
  for (const option of options) {
    if (option.label === "") {
      return false;
    }
  }

  return true;
};

const validateNegativeWeights = (options: Option[]): boolean => {
  for (const option of options) {
    if (option.weight.s < 0) {
      return false;
    }
  }

  return true;
};

export function validateState(state: State): StateValidationStatus {
  if (!validateTitle(state.title)) {
    return StateValidationStatus.ErrorTitle;
  }
  if (!validateOptionsLength(state.options)) {
    return StateValidationStatus.ErrorOptionsLength;
  }
  if (!validateOptionsLabels(state.options)) {
    return StateValidationStatus.ErrorOptionsLabels;
  }
  if (!validateNegativeWeights(state.options)) {
    return StateValidationStatus.ErrorNegativeWeights;
  }

  return StateValidationStatus.Valid;
}

export const isStateValid = (status: StateValidationStatus): boolean =>
  status === StateValidationStatus.Valid;

export const getStateValidationErrorMessage = (
  status: StateValidationStatus,
): string => StateValidationErrors[status];
