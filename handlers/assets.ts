'use strict'

import { CloudFrontResponseHandler } from 'aws-lambda'

const headers = Object.entries({
  'referrer-policy': [{
    key: 'Referrer-Policy',
    value: 'same-origin'
  }],
  'strict-transport-security': [{
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; preload'
  }],
  'x-content-type-options': [{
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }],
  'x-frame-options': [{
    key: 'X-Frame-Options',
    value: 'DENY'
  }],
  'x-xss-protection': [{
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }]
})

const assetsHandler: CloudFrontResponseHandler = (event, _, callback) => {
  const { response } = event.Records[0].cf

  for (const [key, value] of headers) {
    response.headers[key] = value
  }

  return callback(null, response)
}

export default assetsHandler
