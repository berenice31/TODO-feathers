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


  async find (params) {
    return super._find(params)
  }

  async create(data) {
    const task = {
      text: data.text,
    }
    return idea
  }
}

