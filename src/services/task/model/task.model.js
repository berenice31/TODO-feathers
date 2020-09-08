import { Schema } from 'mongoose'
import ModelSchema from './task.schema'

export default function (app) {
  const modelName = 'task'
  const MongoClient = app.get('databases').tasks

  const schema = new Schema(ModelSchema, { 
    timestamps: true,
  })

  return MongoClient.model(modelName, schema)
}
