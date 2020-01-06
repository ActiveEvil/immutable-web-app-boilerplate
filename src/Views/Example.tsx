import React from 'react'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { MetaTitle } from '../Components/UI'

const Example: React.FC<RouteComponentProps> = ({ history }): JSX.Element => {
  const { t } = useTranslation()

  return <>
    <MetaTitle title={t('Example.metatitle', 'This is another view')} />
    <h2>{t('Example.title', 'This is another view')}</h2>
    <p>{t('Example.text', 'Here they come! They\'re coming in too fast! Oooh! We\'ve lost lateral controls. Don\'t worry, she\'ll hold together. You hear me, baby? Hold together! Got him! I got him! Great kid! Don\'t get cocky. There are still two more of them out there! That\'s it! We did it! We did it! Help! I think I\'m melting! This is all your fault.')}</p>
  </>
}

export default withRouter(Example)
