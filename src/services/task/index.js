import { multer, getFiles } from '@middleware/uploads/upload.middleware'
import Service from './service/task.service'
import createModel from './model/.model'
import setupChannel from './channels/task.channel'
import hooks from './hooks'

export default function (app) {
  const config = {
    Model: createModel(app),
    paginate: {
      default: 25,
      max: 25
    }
  }

  app.use('/tasks', new Service(config))

  app.service('task').hooks(hooks)

  setupChannel(app)
}
