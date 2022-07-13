import { State } from "./types"

export const serializeState = (state: State): string =>
  encodeURIComponent(JSON.stringify(state))

export const deserializeState = (str: string): State =>
  JSON.parse(decodeURIComponent(str))
