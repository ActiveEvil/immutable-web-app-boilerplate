'use strict'

import { name } from '../package.json'

export const appName = name

export const appVersionCookie = 'appVersion'

export const cspSources = {
  fontsSrc: ['https://fonts.gstatic.com'],
  formActionSrc: [],
  imgsSrc: [],
  none: "'none'",
  scriptsSrc: ['https://unpkg.com'],
  self: "'self'",
  stylesSrc: ['https://fonts.googleapis.com'],
  unsafeInline: "'unsafe-inline'"
}

export const region = 'us-east-1'

export const ssmAppParameters = ['appConfig', 'appVersion', 'assetDomain']

export const ssmAssetParameters: [string, string] = ['web-apps', 'assetDomain']

export const supportedLanguages = ['en', 'pl']

export const templateName = 'index.html.mustache'
