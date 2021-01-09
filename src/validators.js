export const StateValidEnum = Object.freeze({
  Valid: 0,
  ErrorTitle: 1,
  ErrorOptionsLength: 2,
  ErrorOptionsLabels: 3,
  ErrorChanceSum: 4,
});

const validateTitle = (title) => title !== "";

const validateOptionsLength = (options) => options.length !== 0;

const validateOptionsLabels = (options) => {
  for (const option of options) {
    if (option.label === "") {
      return false;
    }
  }

  return true;
};

const validateChanceSum = (chanceSum) => {
  if (chanceSum != 100) {
    return false;
  }

  return true;
};

export function validateState(state, chanceSum) {
  if (!validateTitle(state.title)) {
    return StateValidEnum.ErrorTitle;
  }
  if (!validateOptionsLength(state.options)) {
    return StateValidEnum.ErrorOptionsLength;
  }
  if (!validateOptionsLabels(state.options)) {
    return StateValidEnum.ErrorOptionsLabels;
  }
  if (!validateChanceSum(chanceSum)) {
    return StateValidEnum.ErrorChanceSum;
  }

  return StateValidEnum.Valid;
}

export const isStateValid = (validateStateResult) =>
  validateStateResult === StateValidEnum.Valid;

export const getErrorMessage = (validateStateResult) => {
  switch (validateStateResult) {
    case StateValidEnum.Valid:
      return "";
    case StateValidEnum.ErrorTitle:
      return "Please, enter a title";
    case StateValidEnum.ErrorOptionsLength:
      return "There must be at least 1 option";
    case StateValidEnum.ErrorOptionsLabels:
      return "Please, enter a label's for all options";
    case StateValidEnum.ErrorChanceSum:
      return "Sum of option's chances must be = 100";
  }
};
