import axios from 'axios'
import 'babel-polyfill' // avoid Regenerator runtime error
import createSagaMiddleware from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()

const FETCH_LYRIC = 'FETCH_LYRIC'
const FETCH_SUCCEDED = 'FETCH_SUCCEDED'
const FETCH_FAILED = 'FETCH_FAILED'

// action: worker
export function* fetchLyric () {
  try {
    const response = yield call(axios.get, '/api/passionfruit')
    yield put({type: FETCH_SUCCEDED, response})
  } catch (error) {
    yield put({type: FETCH_FAILED, error})
  }
}

// action: watcher (sagas have a worker and a watcher)
export default function* rootSaga () {
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
    case FETCH_SUCCEDED:
      let lyric = action.response.data.lyric
      console.log('FETCH_SUCCEDED')
      let newState = {
        ...state,
        lyric: lyric
      }
      console.log(newState)
      return newState
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

sagaMiddleware.run(rootSaga)

// initial state
console.log(store.getState())
// dispatch the action we created
store.dispatch({type: FETCH_LYRIC})

