'use strict'

import { SSM } from 'aws-sdk'
import { ssmAppParameters, ssmAssetParameters } from './constants'

export interface SSMOptions {
  config: string
  origin: string
  version: string
}

const getOptionsFromParameters = (params: SSM.ParameterList): SSMOptions => {
  const { appConfig, appVersion, assetDomain } = getObjectOfParameters(params)

  return {
    config: appConfig,
    origin: `https://${assetDomain}`,
    version: appVersion
  }
}

const getObjectOfParameters = (params: SSM.ParameterList) => {
  const options = Object.assign.apply({},
    params.map(({ Name, Value }) => ({ [Name.split('/').slice(-1)[0]]: Value }))
  )

  for (const key of ssmAppParameters) {
    if (options[key] == null) {
      throw new Error(`Missing parameter ${key}`)
    }
  }

  return options
}

const getParameters = (
  { region, stage, appName },
  callback: (err: Error, data?: SSM.GetParametersResult) => void
) => {
  try {
    const ssm = new SSM({ region })
    const Names = [
      ...ssmAppParameters.map((key) => ['/app', appName, stage, key].join('/')),
      ...[['/app', ssmAssetParameters[0], stage, ssmAssetParameters[1]].join('/')]
    ]
    const params = { Names }

    ssm.getParameters(params, callback)
  } catch (error) {
    callback(error)
  }
}

export const getOptionsFromSsm = (
  { region, stage, appName },
  callback: (err: Error, options?: SSMOptions) => void
) => {
  getParameters({ region, stage, appName }, (err: Error, data) => {
    try {
      if (err) {
        return callback(err)
      }

      const options = getOptionsFromParameters(data.Parameters)

      callback(null, options)
    } catch (error) {
      callback(error)
    }
  })
}
