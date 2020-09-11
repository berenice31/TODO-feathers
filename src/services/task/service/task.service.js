import { Service as MongooseService } from 'feathers-mongoose'
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
import { NotFound } from '@feathersjs/errors'
const moment = require('moment');
import Debug from '@debug'

const debug = Debug('tasks')

export default class Service extends MongooseService {
  setup (app) {
    debug.init('Setup tasks')
  }


  async find (id, params) {
    return super.find(params)
  }

  async get (params) {
    return super.get(params)
  }

  async create(data) {
    const task = {
      name: data.name,
      completed: false
    }
    return task
  }

  update (id, data, params) {
    return super.update(id, data, params) 
  }

  remove (id, params) {
    return super.remove(id, params)
  }
}

