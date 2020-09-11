import { Schema } from 'mongoose'

export default {
  name: { 
    type: String, 
    required: true,
  },
  completed: {
    type: Boolean,
    default: false
  }
}
