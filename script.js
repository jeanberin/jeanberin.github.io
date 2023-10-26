let menu = document.querySelector('#fa-bars');
let navbar = document.querySelector('top-nav-middle-repositioned');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}