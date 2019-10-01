'use strict'

import { createHash } from 'crypto'
import { parse } from 'url'
import { cspSources } from './constants'
import { ExtendedOptions } from './options'

const {
  fontsSrc,
  formActionSrc,
  none,
  imgsSrc,
  scriptsSrc,
  self,
  stylesSrc,
  unsafeInline
} = cspSources

const parseServices = (services: string[]): string[] =>
  services.map((service: string): string => {
    const { protocol, host } = parse(service)

    return `${protocol}//${host}`
  })

const cspHash = (script: string): string =>
  `'sha256-${createHash('sha256').update(script).digest('base64')}'`

export const createCspHeader = (
  options: ExtendedOptions,
  scripts?: string[]
): string => {
  const { origin, config } = options
  const { services } = JSON.parse(config)
  const connectSrc = services ? parseServices(Object.values(services)) : []
  const scriptHashes = scripts.length ? scripts.map(cspHash) : []

  const directives = [
    ['base-uri', self],
    ['connect-src', origin, ...connectSrc],
    ['default-src', origin],
    ['font-src', origin, ...fontsSrc],
    ['form-action', ...formActionSrc],
    ['frame-ancestors', none],
    ['img-src', self, origin, ...imgsSrc],
    ['script-src', origin, ...scriptsSrc, ...scriptHashes],
    ['style-src', origin, unsafeInline, ...stylesSrc]
  ]

  return directives.map((d) => d.join(' ')).join('; ')
}
