/* eslint-env jest */
import configureMockStore from 'redux-mock-store'
import promiseMiddleware from 'redux-promise'
import moxios from 'moxios'

import { fetchLyric, FETCH_LYRIC } from './index'

const middlewares = [promiseMiddleware]

const mockStore = configureMockStore(middlewares)

beforeEach(() => {
  moxios.install()
})

afterEach(() => {
  moxios.uninstall()
})

test('it creates FETCH_SUCCESS when fetching the lyric has been done', () => {
  let request
  moxios.wait(() => {
    request = moxios.requests.mostRecent()
    request.respondWith({
      status: 200,
      response: {
        'lyric': "Passionate from miles away / Passive with the things you say / Passin' up on my old ways / I can't blame you no, no"
      }
    })
  })

  const expectedAction = {
    type: FETCH_LYRIC,
    payload: {
      status: 200,
      data: {
        'lyric': "Passionate from miles away / Passive with the things you say / Passin' up on my old ways / I can't blame you no, no"
      }
    }
  }

  const store = mockStore({
    isFetching: false,
    didError: false,
    lyric: ''
  })

  return store.dispatch(fetchLyric())
  .then(() => {
    let actions = store.getActions()
    expect(actions[0]).toMatchObject(expectedAction)
  })
})
