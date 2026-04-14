import Fuse from 'fuse.js'

interface SearchItem {
  title: string
  url: string
  description: string
  summary: string
}

let fuse: Fuse<SearchItem> | null = null

async function loadIndex(indexUrl: string): Promise<Fuse<SearchItem>> {
  if (fuse) return fuse
  const resp = await fetch(indexUrl)
  const data: SearchItem[] = await resp.json()
  fuse = new Fuse(data, {
    keys: [
      { name: 'title', weight: 0.6 },
      { name: 'description', weight: 0.3 },
      { name: 'summary', weight: 0.1 },
    ],
    threshold: 0.35,
    minMatchCharLength: 1,
    includeMatches: false,
  })
  return fuse
}

function renderResults(results: Fuse.FuseResult<SearchItem>[], container: HTMLElement) {
  container.innerHTML = ''
  if (results.length === 0) {
    container.innerHTML = '<p class="search-empty">无结果</p>'
    return
  }
  results.slice(0, 8).forEach(({ item }) => {
    const a = document.createElement('a')
    a.className = 'search-result-item'
    a.href = item.url
    a.innerHTML = `
      <span class="search-result-title">${item.title}</span>
      ${item.description ? `<span class="search-result-desc">${item.description}</span>` : ''}
    `
    container.appendChild(a)
  })
}

export function initSearch() {
  const input = document.querySelector<HTMLInputElement>('.search-input')
  const results = document.querySelector<HTMLElement>('.search-results')
  if (!input || !results) return

  const indexUrl = input.dataset.index ?? '/zh-cn/index.json'
  let debounceTimer: ReturnType<typeof setTimeout>

  input.addEventListener('focus', () => loadIndex(indexUrl))

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer)
    const query = input.value.trim()
    if (!query) {
      results.classList.remove('is-active')
      return
    }
    debounceTimer = setTimeout(async () => {
      const f = await loadIndex(indexUrl)
      const hits = f.search(query)
      renderResults(hits, results)
      results.classList.add('is-active')
    }, 150)
  })

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target as Node) && !results.contains(e.target as Node)) {
      results.classList.remove('is-active')
    }
  })

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      results.classList.remove('is-active')
      input.blur()
    }
  })
}
