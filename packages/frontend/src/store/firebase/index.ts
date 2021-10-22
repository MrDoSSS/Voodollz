export * as whitelist from './whitelist'
import * as auth from './auth'

export const init = () => {
  auth.init()
}

export { auth }
