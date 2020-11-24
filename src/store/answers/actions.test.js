import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
  ANSWERS_LOADING,
  ANSWERS_LOAD,
  ANSWERS_ERROR_DB,
  ANSWERS_PERSIST
} from './constants'

import {
  loadAllAnswersAC,
  persistAnswersAC
} from './actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const ANSWERS = ['ANSWERS']
const ID = 1
const URL = `${process.env.REACT_APP_DB_URL}/answers/${ID}`

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  describe('loadAllAnswersAC', () => {
    it('creates ANSWERS_LOAD when fetching answers was successful', async () => {
      fetchMock.get(URL, ANSWERS)
      const expectedActions = [
        { type: ANSWERS_LOADING },
        { type: ANSWERS_LOAD, payload: ANSWERS }
      ]
      const store = mockStore()

      await store.dispatch(loadAllAnswersAC(ID))

      expect(store.getActions()).toEqual(expectedActions)
    })
    it('creates ANSWERS_ERROR_DB when fetching answers was not successful', async () => {
      const error = new Error('Fetch failed')
      fetchMock.get(URL, { throws: error })
      const expectedActions = [
        { type: ANSWERS_LOADING },
        { type: ANSWERS_ERROR_DB, payload: error }
      ]
      const store = mockStore()

      await store.dispatch(loadAllAnswersAC(ID))

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  describe('persistAnswersAC', () => {
    it('creates ANSWERS_PERSIST when posting answers was successful', async () => {
      fetchMock.post(`${URL}/${ID}`, ANSWERS)
      const expectedActions = [
        { type: ANSWERS_PERSIST }
      ]
      const store = mockStore()

      await store.dispatch(persistAnswersAC(ID, ID, ANSWERS))

      expect(store.getActions()).toEqual(expectedActions)
    })
    it('creates ANSWERS_ERROR_DB when posting answers was not successful', async () => {
      const error = new Error('Fetch failed')
      fetchMock.post(`${URL}/${ID}`, { throws: error })
      const expectedActions = [
        { type: ANSWERS_ERROR_DB, payload: error }
      ]
      const store = mockStore()

      await store.dispatch(persistAnswersAC(ID, ID, ANSWERS))

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
