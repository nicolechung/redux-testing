/* eslint-env jest */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

import {sum, fetchLyric, FETCH_SUCCESS, FETCH_FAILED, FETCHING_LYRIC } from './index'

const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)

beforeEach(() => {
  moxios.install()
})

afterEach(() => {
  moxios.uninstall()
})

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('it creates FETCH_SUCCESS when fetching the lyric has been done', () => {
  moxios.wait(function () {
    let request = moxios.requests.mostRecent()
    request.respondWith({
      status: 200,
      response: {
        'lyric': "Passionate from miles away / Passive with the things you say / Passin' up on my old ways / I can't blame you no, no"
      }
    })
  })

  const expectedActions = [
    {type: FETCHING_LYRIC},
    {
      type: FETCH_SUCCESS,
      payload: {
        'lyric': "Passionate from miles away / Passive with the things you say / Passin' up on my old ways / I can't blame you no, no"
      }
    }
  ]
  const store = mockStore({
    isFetching: false,
    didError: false,
    lyric: ''
  })

  return store.dispatch(fetchLyric())
  .then(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})
