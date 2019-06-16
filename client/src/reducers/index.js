import { combineReducers } from 'redux'

import {
  LOG_IN,
  LOG_OUT,
} from '../actions'

const authReducer = (state = false, action) => {
  switch (action.type) {
    case LOG_IN:
      return true
    case LOG_OUT:
      return false
    default:
      return state
  }
}

const reducers = combineReducers({
  auth: authReducer
})

export default reducers