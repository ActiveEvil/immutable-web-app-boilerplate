'use strict'

import { CloudFrontResponseEvent, CloudFrontResponseHandler } from 'aws-lambda'
import { appName, getOptionsFromSsm, getResponse, region, Request, SSMOptions } from '../lib'

const createHandler = (stage: string): CloudFrontResponseHandler => (event, _, callback) => {
  const handleRequest = (err: Error, options: SSMOptions) => {
    try {
      if (err) {
        return callback(err)
      }

      const req = formatReq(event)

      getResponse(req, options, callback)
    } catch (error) {
      callback(error)
    }
  }

  getOptionsFromSsm({ region, stage, appName }, handleRequest)
}

const formatReq = (event: CloudFrontResponseEvent): Request => {
  const { request } = event.Records[0].cf
  const url = request.uri
  const headers = formatHeaders(request.headers)

  return {
    headers,
    url
  }
}

const formatHeaders = (headers: object) =>
  Object.assign.apply({},
    Object.values(headers)
      .map((value) => value[0])
      .map(({ key, value }) => ({ [key.toLowerCase()]: value }))
  )

export const experimental = createHandler('experimental')
export const production = createHandler('production')