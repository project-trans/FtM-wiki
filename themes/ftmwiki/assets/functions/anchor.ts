import { ready } from './_utils'

addEventListener('hashchange', onHashChange, { capture: true })
addEventListener('click', onLinkClick, { capture: true })

const BASE_FONT_SIZE = 16
const FOOTNOTES_CLASS_NAME = 'footnote-target'

function onLinkClick(event: Event) {
  const link = event.target as HTMLAnchorElement
  if (link.tagName !== 'A') return
  if (link.host !== location.host) return
  if (link.pathname !== location.pathname) return
  if (!link.hash) return
  event.preventDefault()
  event.stopPropagation()
  history.replaceState(null, document.title, link.hash)
  onHashChange()
}

function onHashChange() {
  if (!location.hash) return
  const anchor = document.getElementById(decodeURI(location.hash.slice(1)))
  if (!anchor) return
  const rect = anchor.getBoundingClientRect()
  const fixedTop = document.querySelector('body > header.navbar')
  scrollTo({
    top: rect.top + scrollY - fixedTop.clientHeight - BASE_FONT_SIZE * 2,
    left: scrollX,
    behavior: 'smooth',
  })
  const content = anchor.closest('.content')
  for (const element of Array.from(content.getElementsByClassName(FOOTNOTES_CLASS_NAME))) {
    element.classList.remove(FOOTNOTES_CLASS_NAME)
    if (element.classList.length === 0) {
      element.removeAttribute('class')
    }
  }
  getFootNote(anchor)?.classList.add(FOOTNOTES_CLASS_NAME)
}

function getFootNote(anchor: HTMLElement): HTMLElement | null {
  if (/^H[1-6]$/.test(anchor.tagName)) {
    return null
  } else if (anchor.id.startsWith('fnref')) {
    const sibling = anchor.previousSibling
    if (sibling?.nodeType !== Node.TEXT_NODE) {
      return sibling as HTMLElement
    }
    return anchor.parentElement
  }
  return anchor
}

ready.then(onHashChange)
