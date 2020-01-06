import React from 'react'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { MetaTitle } from '../Components/UI'

const Home: React.FC<RouteComponentProps> = ({ history }): JSX.Element => {
  const { t } = useTranslation()

  return <>
    <MetaTitle title={t('Home.metatitle', 'This is the home view')} />
    <h2>{t('Home.title', 'This is the home view')}</h2>
    <p>{t('Home.text', 'And what of the Rebellion? If the Rebels have obtained a complete technical readout of this station, it is possible, however unlikely, that they might find a weakness and exploit it. The plans you refer to will soon be back in our hands. Any attack made by the Rebels against this station would be a useless gesture, no matter what technical data they\'ve obtained. This station is now the ultimate power in the universe. I suggest we use it!')}</p>
  </>
}

export default withRouter(Home)
