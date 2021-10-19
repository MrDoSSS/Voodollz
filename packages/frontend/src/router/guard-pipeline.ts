import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'

import * as guards from './guards'

export const guardPipeline: Voodollz.GuardPipeline = (
  context,
  guard = [],
  index = 0
) => {
  if (isEmpty(guard)) {
    context.to.matched.reduce((results, record) => {
      if (!isEmpty(record.meta.guard)) {
        return merge(results, record.meta.guard)
      }
      return results
    }, guard)
  }

  const nextGuard = guards[guard[index]]

  if (!nextGuard) return context.next

  return (params = {}) => {
    if (params.stopPipeline) return context.next(params)

    const nextPipeline = guardPipeline(context, guard, index + 1)

    nextGuard({ ...context, next: nextPipeline })
  }
}
