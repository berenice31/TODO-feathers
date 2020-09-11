import { Schema } from 'mongoose'

export default {
  name: { 
    type: String, 
    required: true,
    unique: true,
  },
  completed: {
    type: Boolean
  }
}
