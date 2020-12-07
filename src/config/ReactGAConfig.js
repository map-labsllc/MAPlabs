import ReactGA from 'react-ga'

const { REACT_APP_GOOGLE_ANALYTICS_ID } = process.env
ReactGA.initialize(REACT_APP_GOOGLE_ANALYTICS_ID, { debug: true })
