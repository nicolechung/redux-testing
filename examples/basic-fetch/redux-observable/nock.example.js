/* eslint-env jest */
import configureMockStore from 'redux-mock-store'
import { createEpicMiddleware } from 'redux-observable';
import nock from 'nock'

import { rootEpic, fetchLyricEpic, FETCH_LYRIC, FETCH_LYRIC_SUCCESS } from './index'

let epicMiddleware = createEpicMiddleware(rootEpic)
const middlewares = [epicMiddleware]
let store = {}
const mockStore = configureMockStore(middlewares)

beforeEach(() => {
  store = mockStore({
    isFetching: false,
    didError: false,
    lyric: ''
  })
})

afterEach(() => {
  nock.cleanAll()
  epicMiddleware.replaceEpic(rootEpic);
})


test('it creates FETCH_SUCCESS when fetching the lyric has been done', () => {
  const payload = {
    status: 200,
    response: {
      'lyric': "Passionate from miles away / Passive with the things you say / Passin' up on my old ways / I can't blame you no, no"
    }
  }
  nock('https://tranquil-fortress-99747.herokuapp.com/')
    .get('api/passionfruit')
    .reply(200, payload)

  const expectedActions = [
    {type: FETCH_LYRIC},
    {
      type: FETCH_LYRIC_SUCCESS,
      payload: {
        'lyric': "Passionate from miles away / Passive with the things you say / Passin' up on my old ways / I can't blame you no, no"
      }
    }
  ]

  store.dispatch({type: FETCH_LYRIC})
  console.log('----store----')
  console.log(store.getActions())
  expect(store.getActions()).toEqual(expectedActions)
})
