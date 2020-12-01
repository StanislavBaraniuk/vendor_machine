import {combineReducers} from 'redux';

import machine from './machine'
import user from './user'

export default combineReducers({
  machine,
  user
})
