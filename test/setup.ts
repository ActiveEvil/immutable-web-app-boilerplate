import fetch from 'node-fetch'

const globalAny: any = global

globalAny.fetch = fetch
