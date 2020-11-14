import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import HOME_PAGE from 'apps/HomePage/Loadable'
import REGISTER from 'apps/HomePage/Loadable'
import DONATE from 'apps/HomePage/Loadable'

const App = () => {

  return <>
    <HelmetProvider>
      <Router>
        <Switch>
          <Route path='/' component={HOME_PAGE} />
          <Route path='/register' component={REGISTER} />
          <Route path='/donate' component={DONATE} />
        </Switch>
      </Router>
    </HelmetProvider>
  </>
}

export default App