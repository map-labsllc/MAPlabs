import {
    LISTS_LOADING,
    LISTS_LOAD,
    LISTS_ERROR_DB,
} from './constants'

import { listsRD } from './reducer'


const PAYLOAD = { beliefs: [], strengths: [], relationships: [] }
const INITIAL_STATE = {
    isLoading: true,
    isError: false,
    errorMessage: '',
    lists: {}
}

describe( 'lists  data reducer', () => {
    it( 'returns initial state when no state is passed in', () => {
        expect( listsRD( undefined, {} ) ).toEqual( INITIAL_STATE )
    } )
    it( 'returns initial state on LISTS_LOADING', () => {
        expect( listsRD( undefined, {type: LISTS_LOADING} ) ).toEqual( INITIAL_STATE )
    } )
    it( 'sets isLoading to false and sets beliefs, strengths, relationships to payload on lists LISTS_LOAD', () => {
        expect( listsRD( undefined, {
            type: LISTS_LOAD,
            payload: PAYLOAD
        } ) ).toEqual( {...INITIAL_STATE, lists: PAYLOAD, isLoading: false} )
    } )
    it( 'sets isError to true, isLoading to false, errorMessage to payload on LISTS_ERROR_DB', () => {
        expect( listsRD( undefined, {
            type: LISTS_ERROR_DB,
            payload: PAYLOAD
        } ) ).toEqual( {
            ...INITIAL_STATE,
            isLoading: false,
            isError: true,
            errorMessage: PAYLOAD
        } )
    } )
} )