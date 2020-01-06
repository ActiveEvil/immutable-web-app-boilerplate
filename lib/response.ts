'use strict'

import { gzip, InputType } from 'zlib'
import { SSMOptions } from './'
import { getIndexContent } from './content'
import { createCspHeader } from './csp'
import { commonHeaders } from './headers'
import { ExtendedOptions, getOptions } from './options'

export interface Request {
  headers: {
    cookie?: string
  },
  url: string
}

const getIndexResponse = (
  options: ExtendedOptions,
  callback: (error: Error, response?: any) => void
) => {
  getIndexContent(options, (err: Error, { content, scripts }) => {
    if (err) {
      return callback(err)
    }

    getBody(content, (error: Error, body) => {
      try {
        if (error) {
          return callback(error)
        }
        const csp = createCspHeader(options, scripts)
        const response = createIndexResponse(body, csp)

        callback(null, response)
      } catch (error) {
        callback(error)
      }
    })
  })
}

const getBody = (
  content: InputType,
  callback: (error: Error, body?: any) => void
) => {
  gzip(content, (err, buffer) => {
    try {
      if (err) {
        return callback(err)
      }

      const body = buffer.toString('base64')

      callback(null, body)
    } catch (error) {
      callback(error)
    }
  })
}

const createIndexResponse = (body: any, csp: string) => ({
  body,
  bodyEncoding: 'base64',
  headers: {
    ...commonHeaders,
    ...cacheHeaders,
    'content-encoding': [{
      key: 'Content-Encoding',
      value: 'gzip'
    }],
    'content-security-policy': [{
      key: 'Content-Security-Policy',
      value: csp
    }],
    'content-type': [{
      key: 'Content-Type',
      value: 'text/html; charset=utf-8'
    }]},
  status: '200',
  statusDescription: 'OK'
})

const createFaviconResponse = ({
  root
}) => ({
  headers: {
    location: [{
      key: 'Location',
      value: `${root}/favicon.png`
    }]
  },
  status: '302',
  statusDescription: 'Found'
})

const cacheHeaders = {
  'cache-control': [{
    key: 'Cache-Control',
    value: 'no-cache, no-store, must-revalidate'
  }]
}

export const getResponse = (
  req: Request,
  options: SSMOptions,
  callback: (err: Error, response?: any) => void
) => {
  try {
    const extendedOptions = getOptions(req, options)

    if (req.url === '/favicon.png') {
      const favicon = createFaviconResponse(extendedOptions)
      return callback(null, favicon)
    }

    getIndexResponse(extendedOptions, callback)
  } catch (error) {
    callback(error)
  }
}
