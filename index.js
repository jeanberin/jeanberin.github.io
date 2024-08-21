   // JavaScript for typing effects
var typed = new Typed(".text", {
    strings:["Web Developer"],
    typeSpeed:50,
    backSpeed:50,
    backDelay:1000,
    loop:false
})

//Header animation
let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector('header');

window.onscroll = function () {
const currentScrollPos = window.pageYOffset;

if (prevScrollPos > currentScrollPos) {
    navbar.style.top = '0';
} else {
    navbar.style.top = '-70px';
}
prevScrollPos = currentScrollPos;
};

   // Javascript for Navbar toggle menu
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

// Skills menu 
function changeContent(page) {
    var contentDiv = document.getElementById('content');

    // Remove existing content
    contentDiv.innerHTML = '';

    // Create a new div for the page content
    var pageContentDiv = document.createElement('div');
    pageContentDiv.id = page + 'Content';  // Use a unique ID for each page

    // Remove the 'active' class from all menu items
    var menuItems = document.querySelectorAll('nav a');
    menuItems.forEach(item => item.classList.remove('active'));

    // Append the new div to the content section
    contentDiv.appendChild(pageContentDiv);

    // Add the 'active' class to the clicked menu item
    if (clickedElement) {
        clickedElement.classList.add('active');
    }
}
