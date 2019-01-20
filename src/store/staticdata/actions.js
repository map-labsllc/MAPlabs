import {
  LOADING,
  LOAD,
  ERROR_DB,
  NO_OP,
} from './constants'

const URL = "http://localhost:3001"

function loadstatic(dispatch, section) {
  return fetch(`${URL}/${section}.json`)
    .then(response => response.json())
    .then((data) => {
      console.log(section, data)
      const payload = {}
      payload[section] = data
      return dispatch({ type: LOAD, payload })
    })
    .catch((error) => {
      console.log("FETCH ERROR", error);
      return dispatch({ type: ERROR_DB, payload: error })
    });
}

/* *****************************************************
   loadAllStaticdataAC()
   Load all staticdata from the son files in the backend /public directory.
   Called by NavBar::onComponentDidMount()
******************************************************** */
export const loadAllStaticdataAC = () => {
  console.log("loadAC()")

  return dispatch => {
    dispatch({ type: LOADING })

    // const p1 = loadstatic(dispatch, 'lifedescrs')
    // const p2 = loadstatic(dispatch, 'beliefs')
    // const p3 = loadstatic(dispatch, 'strengths')

    const p1 = fetch(`${URL}/lifedescrs.json`)
      .then(response => response.json())
      .then((lifedescrs) => {
        console.log("lifedescrs", lifedescrs)
        return dispatch({ type: LOAD, payload: { lifedescrs } })
      })
      .catch((error) => {
        console.log("FETCH ERROR", error);
        return dispatch({ type: ERROR_DB, payload: error })
      });

    const p2 = fetch(`${URL}/beliefs.json`)
      .then(response => response.json())
      .then((beliefs) => {
        console.log("beliefs", beliefs)
        return dispatch({ type: LOAD, payload: { beliefs } })
      })
      .catch((error) => {
        console.log("FETCH ERROR", error);
        return dispatch({ type: ERROR_DB, payload: error })
      });

    const p3 = fetch(`${URL}/strengths.json`)
      .then(response => response.json())
      .then((strengths) => {
        console.log("strengths", strengths)
        return dispatch({ type: LOAD, payload: { strengths } })
      })
      .catch((error) => {
        console.log("FETCH ERROR", error);
        return dispatch({ type: ERROR_DB, payload: error })
      });

    return Promise.all[p1, p2, p3]
  }
}


// /* *****************************************************
//    loadAllStaticdataAC()
//    Load all staticdata from the son files in the backend /public directory.
//    Called by NavBar::onComponentDidMount()
// ******************************************************** */
// export const loadAllStaticdataAC = () => {
//   console.log("loadAC()")
//
//   return dispatch => {
//     dispatch({ type: LOADING })
//
//     // const p1 = loadstatic(dispatch, 'lifedescrs')
//     // const p2 = loadstatic(dispatch, 'beliefs')
//     // const p3 = loadstatic(dispatch, 'strengths')
//
//     const p1 = fetch(`${URL}/lifedescrs.json`)
//       .then(response => response.json())
//       .then((lifedescrs) => {
//         console.log("lifedescrs", lifedescrs)
//         return dispatch({ type: LOAD, payload: { lifedescrs } })
//       })
//       .catch((error) => {
//         console.log("FETCH ERROR", error);
//         return dispatch({ type: ERROR_DB, payload: error })
//       });
//
//     const p2 = fetch(`${URL}/beliefs.json`)
//       .then(response => response.json())
//       .then((beliefs) => {
//         console.log("beliefs", beliefs)
//         return dispatch({ type: LOAD, payload: { beliefs } })
//       })
//       .catch((error) => {
//         console.log("FETCH ERROR", error);
//         return dispatch({ type: ERROR_DB, payload: error })
//       });
//
//     const p3 = fetch(`${URL}/strengths.json`)
//       .then(response => response.json())
//       .then((strengths) => {
//         console.log("strengths", strengths)
//         return dispatch({ type: LOAD, payload: { strengths } })
//       })
//       .catch((error) => {
//         console.log("FETCH ERROR", error);
//         return dispatch({ type: ERROR_DB, payload: error })
//       });
//
//     return Promise.all[p1, p2, p3]
//   }
// }
