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

const questionTitle = document.querySelector(".question-title");
const formAnswers = document.querySelector("#formAnswers");
const nextButton = document.querySelector(".test-modal-next-button");
const prevButton = document.querySelector(".test-modal-prev-button");
const lastTestButton = document.querySelector(".last-test-button");
const lastTestNotify = document.querySelector(".last-test-notify");
const testModalFooter = document.querySelector(".test-modal-footer");
const sendButton = document.querySelector(".test-modal-button");

const inputAnswer = document.querySelectorAll(".input-answer");
const changeColor = document.querySelector(".answer-text");
const labelCheck = document.querySelector(".label-answer");

/*const getData = () => {
  formAnswers.textContent = "Загрузка...";

  setTimeout(() => {
    fetch("./questions.json")
      .then((res) => res.json())
      .then((obj) => playTest(obj.questions))
      .catch((err) => {
        formAnswers.textContent = "Ошибка загрузки данных!";
      });
  }, 1000);
};*/

const questions = [
  {
    question: "Есть ли у вас опыт занятий вокалом?",
    answers: [
      {
        title: "Нет опыта",
      },
      {
        title: "Занимался(-ась) давно, хочу вспомнить и подтянуть вокал",
      },
      {
        title: "Занимался(-ась), но не регулярно",
      },
    ],
    type: "radio",
  },
  {
    question: "Хотите научиться петь профессионально или для себя?",
    answers: [
      {
        title: "Хочу петь для себя",
      },
      {
        title: "Хочу петь профессионально",
      },
    ],
    type: "radio",
  },
  {
    question: "Сколько вам лет?",
    answers: [
      {
        title: "14-17 лет",
      },
      {
        title: "18-30 лет",
      },
      {
        title: "31-40 лет",
      },
      {
        title: "41-50 лет",
      },
      {
        title: "50+ лет",
      },
    ],
    type: "radio",
  },
];

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

/*document.addEventListener("click", (event) => {
  if (
    event.target.dataset.toggle == "test-modal" ||
    event.target.parentNode.dataset.toggle == "test-modal" ||
    !event.composedPath().includes(testModalDialog)
  ) {
    event.preventDefault();
    testModal.classList.toggle("test-modal-is-open");
  }

  if (testModal.classList.contains("test-modal-is-open")) {
    playTest();
  }
});*/

buttonTestModal.addEventListener("click", (event) => {
  event.preventDefault();
  testModal.classList.add("test-modal-is-open");
  //getData();
  playTest();
});

closeTestModal.addEventListener("click", (event) => {
  event.preventDefault();
  testModal.classList.remove("test-modal-is-open");
});

testModal.addEventListener("click", (event) => {
  const target = event.target;

  if (!target.classList.contains("testModalDialog")) {
    target.classList.remove("test-modal-is-open");
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

const playTest = () => {
  const finalAnswers = [];
  let numberQuestion = 0;

  const renderAnswers = (index) => {
    questions[index].answers.forEach((answer) => {
      const answerItem = document.createElement("div");
      answerItem.classList.add("answers-item");
      answerItem.innerHTML = `
        <input
          type="${questions[index].type}"
          id="${answer.title}"
          name="answer"
          value="${answer.title}"
          class="input-answer"
        />
        <label for="${answer.title}" class="label-answer">
          <span class="answer-text">${answer.title}</span>
        </label>
      `;

      /* Встраиваем содержимое формы в форму :) */
      formAnswers.appendChild(answerItem);
    });
  };

  const renderQuestions = (indexQuestion) => {
    formAnswers.innerHTML = ` `;

    if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
      questionTitle.textContent = `${questions[indexQuestion].question}`;

      renderAnswers(indexQuestion);

      nextButton.style.display = "block";
      prevButton.style.display = "block";
      testModalFooter.style.flexDirection = "row";
      lastTestButton.style.display = "none";
      lastTestNotify.style.display = "none";
    }

    if (numberQuestion === 0) {
      prevButton.style.display = "none";
    }

    if (numberQuestion === questions.length) {
      //prevButton.style.display = "none";

      questionTitle.textContent = `Укажите ваше имя`;

      formAnswers.innerHTML = `
      <div class="form-test-group">
        <input 
         id="test-user-name" 
         type="text" 
         class="test-input" 
         name="user-name" 
         placeholder=" "
        />
        <label class="test-input-label" for="test-user-name">Имя</label>
      </div>
      `;
    }

    if (numberQuestion === questions.length + 1) {
      nextButton.style.display = "none";
      prevButton.style.display = "none";
      testModalFooter.style.flexDirection = "column";
      testModalFooter.style.marginTop = "0";
      lastTestButton.style.display = "flex";
      lastTestNotify.style.display = "flex";

      questionTitle.textContent = `Укажите ваше номер телефона, чтобы получить приглашение на бесплатное занятие`;

      formAnswers.innerHTML = `
      <div class="form-test-group">
        <input 
         id="test-user-phone" 
         type="text" 
         class="test-input" 
         name="user-name" 
         placeholder=" "
        />
        <label class="test-input-label" for="test-user-phone">Номер телефона</label>
      </div>
      `;
    }

    if (numberQuestion === questions.length + 2) {
      testModalFooter.style.flexDirection = "row";
      lastTestButton.style.display = "none";
      lastTestNotify.style.display = "none";

      questionTitle.textContent = `Спасибо за участие!`;

      setTimeout(() => {
        testModal.classList.remove("test-modal-is-open");
      }, 2000);
    }
  };

  renderQuestions(numberQuestion);

  const checkAnswer = () => {
    const obj = {};

    const inputs = [...formAnswers.elements].filter(
      (input, index) =>
        input.checked ||
        input.id === "test-user-name" ||
        input.id === "test-user-phone"
    );
    console.log(inputs);

    inputs.forEach((input, index) => {
      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        obj[`${index}_${questions[numberQuestion].question}`] = input.value;
      }

      if (numberQuestion === questions.length) {
        obj["Имя"] = input.value;
      }

      if (numberQuestion === questions.length + 1) {
        obj["Номер телефона"] = input.value;
      }
    });

    finalAnswers.push(obj);

    // const uniqueAnswers = finalAnswers.filter(
    //   (item, index) => finalAnswers.indexOf(item) === index
    // );

    // console.log(uniqueAnswers);

    // const unique = [...formAnswers.elements].filter(
    //   (x, i) => [...formAnswers.elements].indexOf(x) === i
    // );
    // console.log(unique);
  };

  nextButton.onclick = () => {
    checkAnswer();
    numberQuestion++;
    renderQuestions(numberQuestion);
  };

  prevButton.onclick = () => {
    numberQuestion--;
    renderQuestions(numberQuestion);
  };

  sendButton.onclick = () => {
    checkAnswer();
    numberQuestion++;
    renderQuestions(numberQuestion);
    console.log(finalAnswers);
  };
};

/*inputAnswer.forEach((inputItem) => {
  inputItem.addEventListener("input", () => {
    console.log("click");
    if (inputItem.checked) {
    } 
  });
});*/

//inputItem.classList.add("answer-text-sected");
