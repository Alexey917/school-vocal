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

const closeModal = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");

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

const priceButton = document.querySelector(".prices-button");

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

document.addEventListener("keyup", (event) => {
  if (event.key == "Escape" && modal.classList.contains("modal-is-open")) {
    modal.classList.toggle("modal-is-open");
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
      <div class="form-test-group form-name">
        <input 
         id="test-user-name" 
         type="text" 
         class="test-input" 
         name="username" 
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
      // testModalFooter.style.marginTop = "0";
      lastTestButton.style.display = "flex";
      lastTestNotify.style.display = "flex";

      questionTitle.textContent = `Укажите ваш номер телефона, чтобы получить приглашение на бесплатное занятие`;

      formAnswers.innerHTML = `
      <div class="form-test-group">
        <input 
         id="test-user-phone" 
         type="text" 
         class="test-input" 
         name="userphone" 
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

      questionTitle.textContent = `Спасибо за участие!
      Наш менеджер свяжется с вами в течении 5 минут.`;

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

const swiper = new Swiper("#teachers-swiper", {
  speed: 400,
  slidesPerView: 1,
  autoHeight: true,
  loop: true,

  navigation: {
    nextEl: ".slider-button-next",
    prevEl: ".slider-button-prev",
  },
});

const swiperReviews = new Swiper("#reviews-swiper", {
  effect: "cards",
  speed: 400,
  slidesPerView: 1,
  autoHeight: true,
  grabCursor: true,

  navigation: {
    nextEl: ".slider-button-prev",
    prevEl: ".slider-button-next",
  },

  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    dynamicBullets: true,
    clickable: true,
  },

  breakpoints: {
    // when window width is >= 320px
    280: {
      slidesPerView: 1,
    },

    487: {
      effect: "cards",
    },
  },
});

let currentModal; //текущее модальное окно
let modalDialog; //белое диалоговое окно
let alertModal = document.querySelector("#alert-modal"); //окно с благодарностью

const modalButtons = document.querySelectorAll("[data-toggle=modal]"); //переключатели модальных окон
modalButtons.forEach((button) => {
  /*клик по переключателю*/
  button.addEventListener("click", (event) => {
    event.preventDefault();
    /*определяем текущее открытое окно*/
    currentModal = document.querySelector(button.dataset.target);
    /*открываем текущее окно*/
    currentModal.classList.toggle("modal-is-open");
    /*назначаем диалоговое окно*/
    modalDialog = currentModal.querySelector(".modal-dialog");
    /*отслеживаем клик по окну и по пустым областям*/
    currentModal.addEventListener("click", (event) => {
      /*если клик в пустую область (не диалог)*/
      if (!event.composedPath().includes(modalDialog)) {
        /*закрываем окно*/
        currentModal.classList.remove("modal-is-open");
      }
    });
  });
});

const forms = document.querySelectorAll(".form");

forms.forEach((form) => {
  const validation = new JustValidate(form, {
    errorFieldCssClass: "is-invalid",
  });
  validation
    .addField("[name=username]", [
      {
        rule: "required",
        errorMessage: "Укажите имя",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Слишком короткое имя",
      },
      {
        rule: "maxLength",
        value: 20,
        errorMessage: "Слишком длинное имя",
      },
    ])
    .addField("[name=userphone]", [
      {
        rule: "required",
        errorMessage: "Укажите телефон",
      },
      {
        rule: "maxLength",
        value: 18,
        errorMessage: "Некорректный номер",
      },
    ])
    .addField("[name=checkbox]", [
      {
        rule: "required",
        errorMessage: "Поставьте галочку",
      },
    ])
    .onSuccess((event) => {
      const thisForm = event.target;
      const formData = new FormData(thisForm);
      const ajaxSend = (formData) => {
        fetch(thisForm.getAttribute("action"), {
          method: thisForm.getAttribute("method"),
          body: formData,
        }).then((response) => {
          if (response.ok) {
            thisForm.reset();
            currentModal.classList.remove("modal-is-open");
            alertModal.classList.add("modal-is-open");
            currentModal = alertModal;
            modalDialog = currentModal.querySelector(".modal-dialog");
            /*отслеживаем клик по окну и по пустым областям*/
            currentModal.addEventListener("click", (event) => {
              /*если клик в пустую область (не диалог)*/
              if (!event.composedPath().includes(modalDialog)) {
                /*закрываем окно*/
                currentModal.classList.remove("modal-is-open");
              }
            });
          } else {
            alert("Ошибка. Текст ошибки: ".response.statusText);
          }
        });
      };
      ajaxSend(formData);
    });
});

/* Создаем префикс +7, даже если вводят 8 или 9 */
const prefixNumber = (str) => {
  /* если вводят семерку, добавляем ей скобку */
  if (str === "7") {
    return "7 (";
  }
  /* если вводят восьмерку, ставим вместо нее +7 ( */
  if (str === "8") {
    return "+7 (";
  }
  /* если пишут девятку, заменяем на +7 (9  */
  if (str === "9") {
    return "7 (9";
  }
  /* в других случаях просто 7 (  */
  return "7 (";
}; /* профикс в любом раскладе будет +7 () */

/* Ловим события ввода в любом поле */
document.addEventListener("input", (e) => {
  /* Проверяем, что это поле имеет класс phone-mask */
  if (e.target.classList.contains("phone-mask")) {
    /* поле с телефоном помещаем в переменную input */
    const input = e.target;
    /* вставляем плюс в начале номера */
    const value = input.value.replace(/\D+/g, "");
    /* длинна номера 11 символов */
    const numberLength = 11;

    /* Создаем переменную, куда будем записывать номер */
    let result;
    /* Если пользователь ввел 8... */
    if (input.value.includes("+8") || input.value[0] === "8") {
      /* Стираем восьмерку */
      result = "";
    } else {
      /* Оставляем плюсик в поле */
      result = "+";
    }

    /* Запускаем цикл, где переберем каждую цифру от 0 до 11 */
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          /* в самом начале ставим префикс +7 ( */
          result += prefixNumber(value[i]);
          continue;
        case 4:
          /* добавляем после "+7 (" круглую скобку ")" */
          result += ") ";
          break;
        case 7:
          /* дефис после 7 символа */
          result += "-";
          break;
        case 9:
          /* еще дефис  */
          result += "-";
          break;
        default:
          break;
      }
      /* на каждом шаге цикла добавляем новую цифру к номеру */
      result += value[i];
    }
    /* итог: номер в формате +7 (999) 123-45-67 */
    input.value = result;
  }
});

const linksHead = document.querySelectorAll(".navbar-list-item-link");
const linksHeadMobile = document.querySelectorAll(".mobile-menu-link");
const linksFooter = document.querySelectorAll(".footer-list-item-link");
/* спрет оператор: создаем новый массив и добавляем в него массив ссылок и объект с классом main__scroll */
const newArray = [...linksHead];
const mobileLinksArray = [...linksHeadMobile];
const footerLinksArray = [...linksFooter];
//console.log(seamless);

newArray.forEach((link) => {
  link.addEventListener("click", (event) => {
    /* стандартное поведение ссылки отключено */
    event.preventDefault();

    /* берем событие клика по объекту, берем у него target, достаем атрибут href(у того объекта по которму кликнули=target) и отсекаем у него первый символ */
    const ID = event.target.getAttribute("href").substr(1);

    /* нажав на ссылку, которая ведет к определенному id, мы плавно прокручиваемся к секции с этим id(getElementById(ID) получить элемент по id)*/
    /* document.getElementById(ID).scrollIntoView({
      behavior: "smooth",
      /* в начало секции  
      block: "start",
    });*/

    /* Кроссбраузерный вариант скролла */
    seamless.scrollIntoView(document.getElementById(ID), {
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  });
});

mobileLinksArray.forEach((link) => {
  link.addEventListener("click", (event) => {
    /* стандартное поведение ссылки отключено */
    event.preventDefault();

    /* берем событие клика по объекту, берем у него target, достаем атрибут href(у того объекта по которму кликнули=target) и отсекаем у него первый символ */
    const ID = event.target.getAttribute("href").substr(1);

    /* нажав на ссылку, которая ведет к определенному id, мы плавно прокручиваемся к секции с этим id(getElementById(ID) получить элемент по id)*/
    /* document.getElementById(ID).scrollIntoView({
      behavior: "smooth",
      /* в начало секции  
      block: "start",
    });*/

    /* Кроссбраузерный вариант скролла */
    seamless.scrollIntoView(document.getElementById(ID), {
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  });
});

linksFooter.forEach((link) => {
  link.addEventListener("click", (event) => {
    /* стандартное поведение ссылки отключено */
    event.preventDefault();

    /* берем событие клика по объекту, берем у него target, достаем атрибут href(у того объекта по которму кликнули=target) и отсекаем у него первый символ */
    const ID = event.target.getAttribute("href").substr(1);

    /* нажав на ссылку, которая ведет к определенному id, мы плавно прокручиваемся к секции с этим id(getElementById(ID) получить элемент по id)*/
    /* document.getElementById(ID).scrollIntoView({
      behavior: "smooth",
      /* в начало секции  
      block: "start",
    });*/

    /* Кроссбраузерный вариант скролла */
    seamless.scrollIntoView(document.getElementById(ID), {
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  });
});


