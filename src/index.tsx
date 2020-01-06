const { nonce, services } = window.env
__webpack_public_path__ = `${services.assets}/`

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ScreenWrap from './Components/ScreenWrap'
import I18n from './Components/I18n'
import Router from './Components/Router'

const App = (): JSX.Element =>
  <I18n>
    <BrowserRouter>
      <ScreenWrap>
        <Router/>
      </ScreenWrap>
    </BrowserRouter>
  </I18n>

render(<App />, document.querySelector('app-root'))
