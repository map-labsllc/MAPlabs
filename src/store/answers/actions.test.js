import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
    ANSWERS_LOADING,
    ANSWERS_LOAD,
    ANSWERS_ERROR_DB,
    ANSWERS_UPDATE,
    ANSWERS_NO_OP,
} from './constants'

import { 
    loadAllAnswersAC, 
    updatedAnswersAC, 
    persistAnswersAC
} from './actions'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const ANSWERS = ['ANSWERS']
const USERID = 1
const URL = `${process.env.REACT_APP_DB_URL}/answers/${USERID}`

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
        const store = mockStore({ questions: {} })

        await store.dispatch(loadAllAnswersAC(USERID))

        expect(store.getActions()).toEqual(expectedActions)
    }),
    it('creates ANSWERS_ERROR_DB when fetching answers was not successful', async () => {
        const error = new Error('Fetch failed')
        fetchMock.get(URL, { throws: error })
        const expectedActions = [
            { type: ANSWERS_LOADING },
            { type: ANSWERS_ERROR_DB, payload: error }
        ]
        const store = mockStore({ questions: {} })

        await store.dispatch(loadAllAnswersAC(USERID))

        expect(store.getActions()).toEqual(expectedActions)
    })
  })
})