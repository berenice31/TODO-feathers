import { iff, iffElse, isNot, isProvider, disallow } from 'src/services/task/hooks/feathers-hooks-common'
import * as hooks from './task.hooks'

export const before = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}

export const after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}

export const error = {
  all: [
    // handleErrorMessage()
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}

export default {
  before,
  after,
  error
}
