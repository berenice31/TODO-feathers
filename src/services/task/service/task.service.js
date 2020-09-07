import { Service as MongooseService } from 'feathers-mongoose'
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
import { NotFound } from '@feathersjs/errors'
const moment = require('moment');
import Debug from '@debug'

const debug = Debug('flags')

export default class Service extends MongooseService {
  setup (app) {
    debug.init('Setup flags')
  }


  async find (params) {
    return super._find(params)
  }

  async create(data) {
    const idea = {
      text: data.text,
      tech: data.tech,
      viewer: data.viewer
    }
    idea.time = moment().format('h:mm:ss a')
    return idea
  }
}

