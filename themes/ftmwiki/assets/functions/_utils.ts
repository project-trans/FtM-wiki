export const ready = new Promise<void>((resolve) => {
  if (document.readyState === 'complete') {
    resolve()
  } else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState !== 'complete') return
      resolve()
    })
  }
})

export function loadStyle(href: URL | string) {
  return new Promise<void>((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href.toString()
    link.addEventListener('load', () => resolve())
    link.addEventListener('error', reject)
    document.head.append(link)
  })
}

export function loadScript(src: URL | string) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = src.toString()
    script.addEventListener('load', () => {
      resolve()
      script.remove()
    })
    script.addEventListener('error', reject)
    document.head.append(script)
  })
}
