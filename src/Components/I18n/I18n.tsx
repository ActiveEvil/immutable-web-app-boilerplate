import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-xhr-backend'
import React from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { ASSET_SERVICE } from '../../Constants'

const i18n = void i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${ASSET_SERVICE}/locales/{{lng}}/{{ns}}.json`
    },
    debug: process.env.NODE_ENV === 'development',
    detection: {
      order: ['cookie', 'htmlTag']
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

const { Suspense } = React

const I18n: React.FC = ({ children }): JSX.Element =>
  <I18nextProvider i18n={i18n}>
    <Suspense fallback={<div>loading...</div>}>
      {children}
    </Suspense>
  </I18nextProvider>

export default I18n
