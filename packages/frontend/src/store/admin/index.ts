export * as whitelist from './whitelist'
export * as giveaway from './giveaway'
export * as settings from './settings'
export * as stat from './stat'
import * as auth from './auth'

export const init = () => {
  auth.init()
}

export { auth }
