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
const userId = 1

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  describe('loadAllAnswersAC', () => {
    it('creates ANSWERS_LOAD when fetching answers was successful', async () => {
        const expectedActions = [
          { type: ANSWERS_LOADING },
          { type: ANSWERS_LOAD, payload: ANSWERS }
        ]
        const store = mockStore({ questions: {} })
    
        fetchMock.get(`${process.env.REACT_APP_DB_URL}/answers/${userId}`, ANSWERS)
    
        await store.dispatch(loadAllAnswersAC(userId))
    
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})