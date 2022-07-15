import * as base64url from "@iamabbit/base64url"
import { deflateRaw, inflateRaw } from "pako"
import { State } from "./types"

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

export const serializeState = (state: State): string =>
  base64url.encode(deflateRaw(textEncoder.encode(JSON.stringify(state))))

export const deserializeState = (str: string): State =>
  JSON.parse(textDecoder.decode(inflateRaw(base64url.decode(str)))) as State
