// 'redux-promise' middleware

import axios from 'axios'
import { createSagaMiddleware, takeEvery } from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createAction} from 'redux-actions'

const sagaMiddleware = createSagaMiddleware()

const FETCH_LYRIC = 'FETCH_LYRIC'

// action: worker
export function* fetchLyric () {
  try {
    
  } catch(error) {

  }
  const request = axios.get('/api/passionfruit')

  /*
    Note: the payload is promise. If the promise resolves,
    the response object is returned. i.e. unwraps the promise
  */
  return createAction(FETCH_LYRIC)(request)
}

// action: watcher (sagas have a worker and a watcher)
export default function* rootSaga() {
  yield takeEvery(FETCH_LYRIC, fetchLyric)
}
// todo: fetch a failed request


// reducer
const initialState = {
  lyric: ''
}


/*
  Instead of actions for each state (pending, success, error)
  redux promise just returns the response (for a successfully resolved promise)
  or the error object
*/
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
    sagaMiddleware
  ))
)

// initial state
console.log(store.getState())
// dispatch the action we created
store.dispatch(fetchLyric()).then(() => {
  console.log(store.getState())
})

