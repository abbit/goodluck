export type Option = {
  label: string
  chance: string
}

export type State = {
  title: string
  isChancesEqual: boolean
  options: Option[]
}

export enum StateValidationResult {
  Valid,
  ErrorTitle,
  ErrorOptionsLength,
  ErrorOptionsLabels,
  ErrorChanceSum,
}
