import React from 'react'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { MetaTitle } from '../Components/UI'

const PageNotFound: React.FC<RouteComponentProps> = ({ history }): JSX.Element => {
  const { t } = useTranslation()

  return <>
    <MetaTitle title={t('PageNotFound.metatitle', 'Page not found :(')} />
    <h2>t('PageNotFound.title', 'Page Not Found :(')</h2>
    <p>t('PageNotFound.text', 'It looks like this page does not exit.')</p>
  </>
}

export default withRouter(PageNotFound)
