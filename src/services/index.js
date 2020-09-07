import mongoose from 'mongoose'
import init from './init'
import seed from './seed'

import HealthService from './health' 
import TaskService from './task' 

import Debug from '@debug'

const debug   = Debug('@api:error/mongoose')
const initlog = Debug('@api:init')

export default function () {
  const app = this

  if (process.env.DEBUG && process.env.DEBUG.match(/(,)*mongoose/)) {
    mongoose.set('debug', true)
  }

  app.configure(HealthService)
  app.configure(TaskService)

  init(app)
  seed(app)
}
