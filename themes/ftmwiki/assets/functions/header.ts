document.addEventListener('click', onNavbarBurger, { capture: true })

function onNavbarBurger(event: Event) {
  const target = event.target as HTMLElement
  if (!target.classList.contains('navbar-burger')) return
  target.classList.toggle('is-active')
  target.closest('.navbar').querySelector('.navbar-menu').classList.toggle('is-active')
}
