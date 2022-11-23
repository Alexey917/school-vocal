const mMenuToggle = document.querySelector(".mobile-menu-toggle");
const menu = document.querySelector(".mobile-menu");
const iconToggle = document.querySelector(".mobile-menu-line");
const iconToggleTwo = document.querySelector(".mobile-menu-line-2");
const iconToggleThree = document.querySelector(".mobile-menu-line-3");
const iconClose = document.querySelector(".close-icon");

const openMenu = (event) => {
  menu.classList.add("is-open");
  mMenuToggle.classList.add("close-menu");
  document.body.style.overflow = "hidden;"
  iconToggle.style.display = "none";
  iconToggleTwo.style.display = "none";
  iconToggleThree.style.display = "none";
  iconClose.style.display = "block";
}

const closeMenu = (event) => {
  menu.classList.remove("is-open");
  mMenuToggle.classList.remove("close-menu");
  iconToggle.style.display = "block";
  iconToggleTwo.style.display = "block";
  iconToggleThree.style.display = "block";
  iconClose.style.display = "none";
 
}

mMenuToggle.addEventListener('click', (event) => {
  event.preventDefault();
  if(menu.classList.contains("is-open")) {
    closeMenu();
  } else {
    openMenu();  
  }
});