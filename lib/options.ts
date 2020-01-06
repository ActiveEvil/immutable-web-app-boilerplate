'use strict'

import acceptLanguage from 'accept-language'
import cookie from 'cookie'
import { randomBytes } from 'crypto'
import { SSMOptions } from './'
import { appName, appVersionCookie, supportedLanguages } from './constants'
import { Request } from './response'

acceptLanguage.languages(supportedLanguages)

export interface ExtendedOptions {
  config: string
  language: string
  nonce: string
  origin: string
  root: string
  version: string
}

export const getOptions = (
  { headers }: Request,
  options: SSMOptions
): ExtendedOptions => {
  const cookies = headers.cookie ? cookie.parse(headers.cookie) : {}
  const language = cookies.language || acceptLanguage.get(headers['accept-language']) || 'en'
  const nonce = randomBytes(16).toString('base64')
  const version = cookies[appVersionCookie] || options.version
  const { origin } = options

  return {
    ...options,
    language,
    nonce,
    root: [origin, appName, version].filter((x) => x).join('/')
  }
}
