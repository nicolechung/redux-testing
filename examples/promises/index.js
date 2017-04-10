// 'redux-promise' middleware

import axios from 'axios'
import promiseMiddleware from 'redux-promise';
import { createStore, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createAction} from 'redux-actions'

const FETCH_LYRIC = 'FETCH_LYRIC'

// action
function fetchLyric () {
  const request = axios.get('/api/passionfruit')

  /*
    Note: the payload is promise. If the promise resolves,
    the response object is returned. i.e. unwraps the promise
  */
  return createAction(FETCH_LYRIC)(request)
}


// reducer
const initialState = {
  lyric: ''
}

console.log('promise middleware')
console.log(promiseMiddleware)

function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_LYRIC:
      return {
        ...state,
        lyric: action.payload
      }
    default:
      return state
  }
}

// setup store with redux-thunk middleware, also
// setup redux dev tool
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    promiseMiddleware
  ))
)

// initial state
console.log(store.getState())
// dispatch the action we created
store.dispatch(fetchLyric()).then(() => {
  console.log(store.getState())
})

