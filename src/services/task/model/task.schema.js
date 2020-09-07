import { Schema } from 'mongoose'

export default {
  text: { 
    type: String, 
    required: true,
    unique: true,
  },
}
