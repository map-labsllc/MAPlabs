import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()
history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

export default history