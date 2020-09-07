import { GeneralError, BadRequest, NotFound } from 'src/services/task/hooks/@feathersjs/errors'
import Constants from '../constants/task.constants'
import Debug from 'src/services/task/hooks/@debug'

const debug = Debug('flags')

export function associateContinent () {
  return function associateContinent (context) {
    const { data } = context 

    if (!data.country) {
      return Promise.reject(
        new BadRequest({
          message: `Il faut un pays !`
        })
      )
    }

    data.continent = Constants.continents[data.country]

    return context
  }
}

export function getFlag () {
  return function getFlag (context) {
    const { result } = context 

    result.flag = Constants.flags[result.country]

    return context
  }
}