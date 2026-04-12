document.addEventListener('click', onNavbarBurger, { capture: true })
document.addEventListener('click', onNavbarDropdown, { capture: true })

function onNavbarBurger(event: Event) {
  const target = event.target as HTMLElement
  const burger = target.closest<HTMLElement>('.navbar-burger')
  if (!burger) return
  burger.classList.toggle('is-active')
  burger.closest('.navbar')!.querySelector('.navbar-menu')!.classList.toggle('is-active')
}

function onNavbarDropdown(event: Event) {
  const target = event.target as HTMLElement
  const link = target.closest<HTMLElement>('.navbar-link')
  if (!link) return
  const menu = link.closest('.navbar')?.querySelector('.navbar-menu')
  // 只在移动端汉堡菜单展开时处理
  if (!menu?.classList.contains('is-active')) return
  event.preventDefault()
  const dropdown = link.closest('.has-dropdown')
  dropdown?.classList.toggle('is-active')
}
