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

const playTest = (questions) => {
  const finalAnswers = [];
  //переменная с номером вопроса
  let numberQuestion = 0;

  //функция рендеринга ответов
  const renderAnswers = (index) => {
    questions[index].answers.forEach((answer) => {
      answerItem.innerHTML = `
        <input type="${questions[index].type}" id="${answer.title}" name="answer" class="input-answer" value="${answer.title}">
        <label for="${answer.title}" class="label-answer">
          <span>${answer.title}</span>
        </label>
        `;
      formAnswers.appendChild(answerItem);
    });
  };

  const renderQuestions = (indexQuestion) => {
    formAnswers.innerHTML = ``;

    if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
      /* задает текстовое содержимое элементу или считывает текст */
      questionTitle.textContent = `${questions[indexQuestion].question}`;

      renderAnswers(indexQuestion);

      nextButton.classList.remove("d-none");
      prevButton.classList.remove("d-none");
      sendButton.classList.add("d-none");
    }

    if (numberQuestion === 0) {
      prevButton.classList.add("d-none");
    }

    if (numberQuestion === questions.length) {
      nextButton.classList.add("d-none");
      prevButton.classList.add("d-none");
      sendButton.classList.remove("d-none");
      formAnswers.innerHTML = `
      
      <div class="form-group">
        <label for="numberPhone">Enter your number</label>
        <input type="phone" class="form-control" id="numberPhone">
      </div>
      `;
    }

    if (numberQuestion === questions.length + 1) {
      formAnswers.textContent = "Спасибо за пройденный тест";
      setTimeout(() => {
        modalBlock.classList.remove("d-block");
      }, 2000);
    }
  };
  renderQuestions(numberQuestion);
};
