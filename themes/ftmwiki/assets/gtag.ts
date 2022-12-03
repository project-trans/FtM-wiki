import { loadScript } from './functions/_utils'

declare global {
  interface Window {
    dataLayer: IArguments[]
  }
}

const IDENTIFY = 'G-1MTN0T28Z7'

self.dataLayer = self.dataLayer || []

gtag('js', new Date())
gtag('config', IDENTIFY)

loadScript('https://www.googletagmanager.com/gtag/js?id=' + IDENTIFY).then(restoreClientID)

export function gtag(method: 'js', value: Date): void
export function gtag(method: 'config', value: string): void
export function gtag(method: 'event', action: string, params: object): void
export function gtag(method: 'get', identify: string, key: string, callback: (value: unknown) => void): void
export function gtag(method: 'set', key: string, value: unknown): void
export function gtag(): void {
  self.dataLayer.push(arguments)
}

function restoreClientID() {
  const KEY = 'GA:CLIENT-ID'
  const clientId = sessionStorage.getItem(KEY)
  if (clientId) {
    gtag('set', 'client_id', clientId)
  } else {
    gtag('get', IDENTIFY, 'client_id', (client_id) => {
      sessionStorage.setItem(KEY, String(client_id))
    })
  }
}
