import { multer, getFiles } from '@middleware/uploads/upload.middleware'
import Service from './service/flag.service'
import createModel from './model/task.model'
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

  app.use('/flags', new Service(config))

  app.service('flags').hooks(hooks)

  setupChannel(app)
}
