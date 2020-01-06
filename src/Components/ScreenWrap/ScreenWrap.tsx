import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../Constants'
import GqlClient from '../GqlCLient'

const ScreenWrap: React.FC = ({ children }): JSX.Element => {
  const { t } = useTranslation()

  return <GqlClient>
    <header>
      <h1>{t('ScreenWrap.title', 'Hello')}</h1>
      <nav>
        <ul>
          <li><Link to={ROUTES.HOME}>{t('ScreenWrap.homeLink', 'Home')}</Link></li>
          <li><Link to={ROUTES.EXAMPLE}>{t('ScreenWrap.exampleLink', 'Example')}</Link></li>
        </ul>
      </nav>
    </header>
    <main>
      {children}
    </main>
    <footer>
     {t('ScreenWrap.footer', 'footer stuff')}
    </footer>
  </GqlClient>
}

export default ScreenWrap
