import mongoose from 'mongoose'
import createConnection from './mongo/create-connection'

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)

export default function (app) {
  const tasks = createConnection('tasks', process.env.MONGO_URL, process.env.MONGO_DB)

  app.set('databases', {
    tasks,
  })
}
