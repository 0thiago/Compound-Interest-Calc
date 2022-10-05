export default function toggleMenu() {

  let closeMenuButton = document.querySelector('#closeMenuButton')
  let showMenuButton = document.querySelector('#showMenuButton')
  let menu = document.querySelector('#menuContainer')
  let unfocusedBody = document.querySelector('#unfocusedBody')

  showMenuButton.onclick = () => {
    menu.classList.toggle('show')
  }

  unfocusedBody.onclick = () => {
    menu.classList.remove('show')
  }

  closeMenuButton.onclick = () => {
    menu.classList.remove('show')
  }
}