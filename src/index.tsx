import React from 'react'
import { render } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { createGlobalStyle } from 'styled-components'
import I18n from './Components/I18n'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Vollkorn', serif;
    font-size: 18px;
  }
`

const HelloWorld: React.FC = (): JSX.Element => {
  const { t } = useTranslation()

  return <div>{t('helloWorld', 'Hello World')}</div>
}

const App: React.FC = (): JSX.Element =>
  <I18n>
    <GlobalStyle/>
    <HelloWorld/>
  </I18n>

render(<App />, document.querySelector('app-root'))
