addEventListener('click', onFigureClick, { capture: true })

function onFigureClick(event: Event) {
  const element = event.target as HTMLElement
  if (element.tagName !== 'IMG') return
  const parent = element.closest<HTMLElement>('figure[data-mask="true"]')
  if (!parent) return
  delete parent.dataset.mask
}
