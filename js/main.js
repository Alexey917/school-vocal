const mMenuToggle = document.querySelector(".mobile-menu-toggle");
const menu = document.querySelector(".mobile-menu");
const iconToggle = document.querySelector(".mobile-menu-line");
const iconToggleTwo = document.querySelector(".mobile-menu-line-2");
const iconToggleThree = document.querySelector(".mobile-menu-line-3");
const iconClose = document.querySelector(".close-icon");
const mobileLink = document.querySelectorAll(".mobile-menu-link");

const buttonTestModal = document.querySelector(".button-test");
const testModal = document.querySelector(".test-modal");
const testModalDialog = document.querySelector(".test-modal-dialog");
const closeTestModal = document.querySelector(".close-test-modal");

const inputAnswer = document.querySelectorAll(".input-answer");
const changeColor = document.querySelector(".answer-text");

const openMenu = (event) => {
  menu.classList.add("is-open");
  mMenuToggle.classList.add("close-menu");
  document.body.style.overflow = "hidden;";
  iconToggle.style.display = "none";
  iconToggleTwo.style.display = "none";
  iconToggleThree.style.display = "none";
  iconClose.style.display = "block";
};

const closeMenu = (event) => {
  menu.classList.remove("is-open");
  mMenuToggle.classList.remove("close-menu");
  iconToggle.style.display = "block";
  iconToggleTwo.style.display = "block";
  iconToggleThree.style.display = "block";
  iconClose.style.display = "none";
};

mMenuToggle.addEventListener("click", (event) => {
  event.preventDefault();
  if (menu.classList.contains("is-open")) {
    closeMenu();
  } else {
    openMenu();
  }

  mobileLink.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("is-open")) {
        closeMenu();
      }
    });
  });
});

closeTestModal.addEventListener("click", (event) => {
  event.preventDefault();
  testModal.classList.remove("test-modal-is-open");
});

document.addEventListener("click", (event) => {
  if (
    event.target.dataset.toggle == "test-modal" ||
    event.target.parentNode.dataset.toggle == "test-modal" ||
    !event.composedPath().includes(testModalDialog)
  ) {
    event.preventDefault();
    testModal.classList.toggle("test-modal-is-open");
  }
});

document.addEventListener("keyup", (event) => {
  if (
    event.key == "Escape" &&
    testModal.classList.contains("test-modal-is-open")
  ) {
    testModal.classList.toggle("test-modal-is-open");
  }
});

/*inputAnswer.forEach((inputItem) => {
  inputItem.addEventListener("input", () => {
    console.log("click");
    if (inputItem.checked) {
      inputItem.classList.add("answer-text-sected");
      console.log("true");
    } else {
      inputItem.classList.remove("answer-text-sected");
    }
  });
});*/

