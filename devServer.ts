 // tslint:disable: no-console
'use strict'

import cors from 'cors'
import express from 'express'
import { readFileSync } from 'fs'
import { IncomingMessage } from 'http'
import { createServer } from 'https'
import { join, resolve } from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { getResponse, Request } from './lib'
import { name } from './package.json'
import webpackConf from './webpack/client.config'

const webpackConfig = webpackConf({}, { mode: 'development' })

const port = 8080
const assetPort = 8081
const host = 'localhost'

const config = {
  services: {
    example: 'https://httpbin.org/get'
  },
  title: 'Hello World'
}

const options = {
  config: JSON.stringify(config),
  origin: `https://${host}:${assetPort}`,
  version: ''
}

const formatHeaders = (headers: object) =>
  Object.assign.apply({},
    Object.values(headers)
      .map((value) => value[0])
      .map(({ key, value }) => ({ [key]: value }))
  )

const formatReq = (request: IncomingMessage): Request => {
  const { headers } = request

  return {
    headers,
    url: ''
  }
}

const devServer = express()
const compiler = webpack(webpackConfig)
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output!.publicPath!
  // stats: 'errors-only'
})
const hotMiddleware = webpackHotMiddleware(compiler, {
  reload: true
})

devServer.use(cors())
devServer.use(`/${name}/index.html.mustache`, express.static(join(__dirname, '/dist', name, 'index.html.mustache')))
devServer.use(`/${name}/favicon.png`, express.static(join(__dirname, '/dist', name, 'favicon.png')))
devServer.use(`/${name}/locales`, express.static(join(__dirname, '/dist', name, 'locales')))
devServer.use(devMiddleware)
devServer.use(hotMiddleware)

const assetServer = createServer({
  cert: readFileSync('certs/private.crt'),
  key: readFileSync('certs/private.key')
}, devServer)

const server = createServer({
  cert: readFileSync('certs/private.crt'),
  key: readFileSync('certs/private.key')
}, (req, res) => {
  const handleError = (err: Error) => {
    console.error(err)
    res.writeHead(500)
    res.end()
  }

  const handleResponse = (response) => {
    const { status, body, bodyEncoding, headers } = response

    res.writeHead(status, formatHeaders(headers))

    if (!body) {
      return res.end()
    }

    const data = Buffer.from(body, bodyEncoding)

    res.end(data)
  }

  getResponse(formatReq(req), options, (err: Error, response) => {
    try {
      if (err) {
        return handleError(err)
      }

      handleResponse(response)
    } catch (error) {
      handleError(error)
    }
  })
})

assetServer.listen(assetPort)
server.listen(port, () => { console.log(`https://${host}:${port}`) })
