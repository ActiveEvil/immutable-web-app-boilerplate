'use strict'

import * as http from 'http'
import * as https from 'https'
import { render } from 'mustache'
import { URL } from 'url'
import { appName, templateName } from './constants'
import { exampleScript } from './inlineScripts'
import { ExtendedOptions } from './options'

const templateCache = {}

interface Content {
  content: string
  scripts: string[]
}

const getIndexTemplate = (
  options: ExtendedOptions,
  callback: (err: Error, template?: any) => void
) => {
  try {
    const url = `${options.root}/${templateName}`
    const cachedTemplate = templateCache[url]

    if (cachedTemplate) {
      return callback(null, cachedTemplate)
    }

    httpGet(url, (err: Error, template) => {
      try {
        if (err) {
          return callback(err)
        }

        templateCache[url] = template

        callback(null, template)
      } catch (err) {
        callback(err)
      }
    })
  } catch (err) {
    callback(err)
  }
}

const httpGet = (
  url: string,
  callback: (error: Error, template?: any) => void
) => {
  try {
    const isHttps = new URL(url).protocol === 'https:'
    const get = isHttps ? https.get : http.get
    get(url, (res) => {
      const { statusCode } = res

      if (statusCode !== 200) {
        callback(new Error(`Status Code ${statusCode}`))
      }

      let data = ''

      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => { callback(null, data) })
      res.on('err', callback)
    })
  } catch (err) {
    callback(err)
  }
}

const createContent = (
  template: any,
  {
    config,
    language,
    nonce,
    root,
    version
  }: ExtendedOptions
): Content => {
  const parsedConfig = JSON.parse(config)
  const env = {
    ...parsedConfig,
    ...{
      nonce,
      services: {
        ...parsedConfig.services,
        ...{ assets: root }
      }
    }
  }

  const envScript = `window.env = JSON.parse(decodeURIComponent('${encodeURIComponent(JSON.stringify(env))}'))`
  const content = render(template, {
    appName,
    envScript,
    exampleScript,
    language,
    metaTitle: JSON.parse(config).title,
    root,
    version
  })

  return {
    content,
    scripts: [envScript, exampleScript]
  }
}

export const getIndexContent = (
  options: ExtendedOptions,
  callback: (error: Error, content?: Content) => void
) => {
  getIndexTemplate(options, (err: Error, template: any) => {
    try {
      if (err) {
        return callback(err)
      }

      const content = createContent(template, options)

      callback(null, content)
    } catch (error) {
      callback(error)
    }
  })
}
