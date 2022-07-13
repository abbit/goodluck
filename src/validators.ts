import { Option, State, StateValidationResult } from "./types"

const validateTitle = (title: string): boolean => title !== ""

const validateOptionsLength = (options: Option[]): boolean =>
  options.length !== 0

const validateOptionsLabels = (options: Option[]): boolean => {
  for (const option of options) {
    if (option.label === "") {
      return false
    }
  }

  return true
}

const validateChanceSum = (chanceSum: number): boolean => chanceSum == 100

export function validateState(
  state: State,
  chanceSum: number
): StateValidationResult {
  if (!validateTitle(state.title)) {
    return StateValidationResult.ErrorTitle
  }
  if (!validateOptionsLength(state.options)) {
    return StateValidationResult.ErrorOptionsLength
  }
  if (!validateOptionsLabels(state.options)) {
    return StateValidationResult.ErrorOptionsLabels
  }
  if (!validateChanceSum(chanceSum)) {
    return StateValidationResult.ErrorChanceSum
  }

  return StateValidationResult.Valid
}

export const isStateValid = (
  validateStateResult: StateValidationResult
): boolean => validateStateResult === StateValidationResult.Valid

export const getErrorMessage = (
  validateStateResult: StateValidationResult
): string => {
  switch (validateStateResult) {
    case StateValidationResult.Valid:
      return ""
    case StateValidationResult.ErrorTitle:
      return "Please, enter a title"
    case StateValidationResult.ErrorOptionsLength:
      return "There must be at least 1 option"
    case StateValidationResult.ErrorOptionsLabels:
      return "Please, enter a label's for all options"
    case StateValidationResult.ErrorChanceSum:
      return "Sum of option's chances must be = 100"
  }
}
