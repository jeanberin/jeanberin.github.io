let hamburger = document.querySelector(".drop-down");
let navbar = document.querySelector("ul")
hamburger.onclick = function() {
  if (navbar.style.left === "-100%") {
    navbar.style.left = "0";
  } else {
    navbar.style.left = "-100%";
  }

}

