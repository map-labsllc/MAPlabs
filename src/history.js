import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()
history.listen(location => {
  console.log("history heard", location)
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

export default history