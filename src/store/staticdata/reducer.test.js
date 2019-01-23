import {
    STATICDATA_LOADING,
    STATICDATA_LOAD,
    STATICDATA_ERROR_DB,
    STATICDATA_NO_OP,
} from './constants'

import { staticdataRD } from './reducer'

const PAYLOAD = { beliefs: '', strengths: '', lifedescrs: '' }
const INITIAL_STATE = {
    isLoading: true,
    isError: false,
    errorMessage: '',
    beliefs: [],
    strengths: [],
    lifedescrs: [], 
}

describe('static data reducer', () => {
    it('returns passed in state by default', () => {
        expect(staticdataRD(PAYLOAD, {})).toEqual(PAYLOAD)
    }),
    it('returns initial state when no state is passed in', () => {
        expect(staticdataRD(undefined, {})).toEqual(INITIAL_STATE)
    }),
    it('returns initial state on STATICDATA_LOADING', () => {
        expect(staticdataRD(undefined, {type: STATICDATA_LOADING})).toEqual(INITIAL_STATE)
    }),
    it('sets isLoading to false and sets beliefs, strengths, lifedescrs to payload on STATICDATA_LOAD', () => {
        expect(staticdataRD(undefined, {
            type: STATICDATA_LOAD,
            payload: PAYLOAD
        })).toEqual({...INITIAL_STATE, ...PAYLOAD, isLoading: false})
    }),
    it('sets isError to true, isLoading to false, errorMessage to payload on STATICDATA_ERROR_DB', () => {
        expect(staticdataRD(undefined, {
            type: STATICDATA_ERROR_DB,
            payload: PAYLOAD
        })).toEqual({
            ...INITIAL_STATE, 
            isLoading: false,
            isError: true,
            errorMessage: PAYLOAD
        })
    }),
    it('returns passed in state on STATICDATA_NO_OP', () => {
        expect(staticdataRD(PAYLOAD, {type: STATICDATA_NO_OP})).toEqual(PAYLOAD)
    })
})  