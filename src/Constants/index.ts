// configure environment settings here
declare global {
  interface Window {
    env?: any
  }
}

const { services } = window.env

export const ASSET_SERVICE = services.assets