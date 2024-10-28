(() => {
  function saveTheme(theme) {
    localStorage.setItem("theme", theme);
  }
  function getSavedTheme() {
    return localStorage.getItem("theme");
  }


  class Card {
    constructor(container, cardNumber,) {
      container.append(this.createElement())
      this.container = container
      this.cardNumber = cardNumber
    }
    createElement() {
      const card = document.createElement('li')
      const cardInside = document.createElement("button");
      cardInside.classList.add("btn-reset", "list__button");
      card.classList.add("game__list", "delete");
      
      card.append(cardInside)
      this.cardElement = card
      return card
    }

  
    set cardNumber(value) {           
      this._cardNumber = value    
      if(this.cardElement) {
        this.cardElement.setAttribute('data-number', value)
      } else {
      }
    }

    get cardNumber() {
      return this._cardNumber
    }

    set open(value) {
      this._open = value
      if(value = true) {
        this.cardElement.classList.add('back')
      } else {
        this.cardElement.classList.remove('back')
      }
    }

    get open() {
      return this._open;
    }

    set success(value) {
      this._success = value
      if(value === true) {
        setTimeout(() => {
          this.cardElement.classList.add('clear')
          this.cardElement.classList.remove('back')
          this.cardInside.disabled = true
        }, 1500);
      } else {
        return
      }
    }

    get success() {
      return this._success
    }

  }

  class AmazingCard extends Card {
    set cardNumber(value) {
      this._cardNumber = value
      const cardImages = [
        'https://cs6.livemaster.ru/storage/51/8d/e9304e78c01418b5ea956d3be36a.jpg',
        'https://img.freepik.com/free-photo/beautiful-kitten-with-colorful-clouds_23-2150752964.jpg',
        'https://cs14.pikabu.ru/post_img/big/2023/02/06/10/1675705781113960359.png',
        
      // фек 

      'https://oir.mobi/uploads/posts/2024-03/thumbs/1711131200_oir-mobi-8a5x-p-samie-milie-kotiki-123.jpg', 

      //
        'https:///saponelli.ru/uploads/product/500/578/thumbs/30_IMG_6582-(2)_2021-09-16_17-11-41.JPG',
        'https://s.zefirka.net/images/2022-06-13/milye-kotiki-zaryazhayut-pozitivom-na-snimkax/milye-kotiki-zaryazhayut-pozitivom-na-snimkax-1.jpg',
        'https://f8.pmo.ee/GHyvqnWdTXy2WEbGgig8LHNWddU=/685x0/filters:format(webp)/nginx/o/2022/08/03/14736428t1h4a35.jpg', 
        'https://primamediamts.servicecdn.ru/f/original/3569/3568192.jpg?2d2dfc8d3ae1c3637387b1005054a699',
        'https://cool.klev.club/uploads/posts/2024-05/cool-klev-club-gsch-p-prikolnie-kartinki-milie-kotiki-na-avu-2.jpg'
      ]
      const img = document.createElement('img')
      
      img.src = cardImages[value]
      
      img.onerror = () => {
        img.src = './img/default.jpg'
      }


      if(this.cardElement) {
        this.cardElement.setAttribute('data-number', value)
      }
      img.classList.add('li-img')
      this.cardElement.append(img)
    }
  }

 

  function createNumbersArray(count) {
    const arr = [];
    for (let i = 1; i <= count; i++) {
      arr.push(i);
      arr.push(i);
    }
    return arr;
  }

  function shuffle(arr) {
    let currentIndex = arr.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      let temp = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temp;
    }
    return arr;
  }


  function startGame() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1920) {
      document.body.classList.remove("game-back");
      document.body.classList.add("bg-ex-animation");

      const divContainer = document.createElement("div");
      const div = document.createElement("div");
      const ul = document.createElement("ul");
      const button = document.createElement("button");
      const buttonReset = document.createElement("button");
      const nightButton = document.createElement("button");
      const joker = document.createElement("button");
      const cardAdd = document.createElement("button");
      const cardRemove = document.createElement("button");

      document.body.append(divContainer);
      divContainer.append(div);
      div.append(button);
      div.append(ul);
      div.append(buttonReset);
      div.append(nightButton);
      div.append(joker);
      div.append(cardAdd);
      div.append(cardRemove);

      divContainer.classList.add("container");
      div.classList.add("game__wrapper");
      ul.classList.add("game__ul");
      button.classList.add("game__button");
      buttonReset.classList.add("game__button-reset");
      nightButton.classList.add("night", "btn-reset");
      joker.classList.add("btn-reset", "joker");
      cardAdd.classList.add("btn-reset", "game__card-add");
      cardRemove.classList.add("btn-reset", "game__card-remove");

      buttonReset.textContent = "Еще разок";
      button.textContent = "Начать игру";

      const startGameButton = document.querySelector(".game__button");
      const resetGameButton = document.querySelector(".game__button-reset");

      function deleteAllCards() {
        const lists = document.querySelectorAll(".game__list");
        for (const list of lists) {
          list.remove();
        }
      }

      function createList(cards) {
        const lists = document.querySelectorAll(".game__list");
        const ul = document.querySelector(".game__ul");
        const shuffledIds = shuffle(createNumbersArray(cards / 2));
        let firstCard = null;
        let secondCard = null;

        for (let i = 0; i < cards; i++) {
          const li = document.createElement("li");
          const listBtn = document.createElement("button");
          listBtn.classList.add("btn-reset", "list__button");
          li.append(listBtn);
          li.classList.add("game__list", "delete");
          li.dataset.number = shuffledIds[i];
          ul.append(li);
        }

        return ul;
      }

      document
        .querySelector(".game__ul")
        .addEventListener("click", function (event) {
          const clickedElement = event.target;
          if (clickedElement.classList.contains("list__button")) {
            const li = clickedElement.parentElement;
            if (firstCard !== null && secondCard !== null) {
              return;
            }

            if (firstCard === null && secondCard === null) {
              li.classList.add("back");
              clickedElement.textContent = li.dataset.number;
            }
            if (firstCard == null) {
              firstCard = li.dataset.number;
              console.log("первая карта - " + li.dataset.number);
            } else {
              li.classList.add("back");
              secondCard = li.dataset.number;
              clickedElement.textContent = li.dataset.number;
              console.log("вторая карта - " + li.dataset.number);
            }

            let cards = document.querySelectorAll(".back");
            let one = cards[0];
            let two = cards[1];

            if (firstCard !== null && secondCard !== null) {
              // обе карты открыты
              let firstCardNum = firstCard;
              let secondCardNum = secondCard;
              if (firstCardNum !== secondCardNum) {
                setTimeout(() => {
                  one.classList.remove("back");
                  one.firstChild.textContent = "";
                  firstCard = null;
                  two.classList.remove("back");
                  two.firstChild.textContent = "";
                  secondCard = null;
                }, 1200);
              }
              if (firstCardNum === secondCardNum) {
                setTimeout(() => {
                  one.classList.remove("back", "delete");
                  one.classList.add("clear");
                  one.firstChild.disabled = true;
                  firstCard = null;
                  two.classList.remove("back", "delete");
                  two.classList.add("clear");
                  two.firstChild.disabled = true;
                  secondCard = null;
                }, 1500);

                checkAllCards = false;

                const listWitchClass = document.querySelectorAll(".delete");
                if (listWitchClass.length == 2) {
                  checkAllCards = true;
                }

                if (checkAllCards) {
                  const modalWrapper =
                    document.querySelector(".modal__wrapper");
                  const modalWindow = document.querySelector(".modal__window");
                  const modalBtn = document.querySelector(".modal__button");
                  const modalBtnClose = document.querySelector(
                    ".modal__button-close"
                  );
                  setTimeout(() => {
                    modalWrapper.classList.remove("hidden");
                    modalWindow.classList.remove("hidden");
                  }, 2000);
                  modalBtn.addEventListener("click", () => {
                    modalWrapper.classList.add("hidden");
                    modalWindow.classList.add("hidden");
                    resetGameButton.click();
                    startGameButton.click();
                  });
                  modalBtnClose.addEventListener("click", () => {
                    window.close();
                  });
                }
              }
            }
          }
        });

      function deleteList(cards) {
        const lists = document.querySelectorAll(".game__list");
        for (let i = 0; i < lists.length; i++) {
          if (lists.length == 8) {
            deleteAllCards();
            createList(4);
            ul.classList.remove("game__ul-grid-columns");
            cardRemove.classList.remove("game__card-prop");
            cardAdd.classList.add("game__card-prop");
          } else if (lists.length == 4) {
            deleteAllCards();
            createList(4);
            ul.classList.remove("game__ul-grid-columns");
            cardRemove.classList.remove("game__card-prop");
            cardAdd.classList.add("game__card-prop");
          }
        }
      }

      startGameButton.addEventListener("click", function startGame() {
        const lists = document.querySelectorAll(".game__list");
        const element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          // Firefox
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          // Chrome, Safari and Opera
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          // IE/Edge
          element.msRequestFullscreen();
        }
        if (lists.length == 0) {
          const lists = document.querySelectorAll(".game__list");
          if (lists.length < 4) {
            createList(4);
          }
          cardAdd.classList.add("game__card-prop");
        }
        firstCard = null;
        secondCard = null;
      });

      resetGameButton.addEventListener("click", () => {
        deleteAllCards();
        ul.classList.remove("game__ul-grid-columns");
        cardAdd.classList.remove("game__card-prop");
        cardRemove.classList.remove("game__card-prop");
        firstCard = null;
        secondCard = null;
      });

      cardAdd.addEventListener("click", () => {
        const lists = document.querySelectorAll(".game__list");
        if (lists.length == 4) {
          ul.classList.add("game__ul-grid-columns");
          ul.classList.remove("game__ul-grid-pl");
          deleteAllCards();
          createList(8);
          cardAdd.classList.remove("game__card-prop");
          cardRemove.classList.add("game__card-prop");
        }
      });

      cardRemove.addEventListener("click", () => {
        deleteList(4);
      });

      const themeButton = document.querySelector(".night");
      themeButton.addEventListener("click", () => {
        let darkLink = document.getElementById("dark-theme");
        if (!darkLink) {
          let link = document.createElement("link");
          link.id = "dark-theme";

          link.setAttribute("rel", "stylesheet");
          link.setAttribute("href", "./css/night-style.css");

          document.head.append(link);
          saveTheme("dark");
        } else {
          darkLink.remove();
        }
      });

      const jokerBack = document.querySelector(".joker");
      jokerBack.addEventListener("click", () => {
        let jokerTheme = document.getElementById("joker-theme");

        if (!jokerTheme) {
          let link = document.createElement("link");
          link.id = "joker-theme";

          link.setAttribute("rel", "stylesheet");
          link.setAttribute("href", "./css/joker-style.css");

          document.head.append(link);
          saveTheme("joker");
        } else {
          jokerTheme.remove();
        }
      });

      const savedTheme = getSavedTheme();
      if (savedTheme === "dark") {
        themeButton.click();
      } else if (savedTheme === "joker") {
        jokerBack.click();
      }
    } else {
      document.body.classList.remove("game-back");
      document.body.classList.add("bg-ex-animation");

      const divContainer = document.createElement("div");
      const div = document.createElement("div");
      const ul = document.createElement("ul");
      const button = document.createElement("button");
      const buttonReset = document.createElement("button");
      const nightButton = document.createElement("button");
      const joker = document.createElement("button");
      const cardAdd = document.createElement("button");
      const cardRemove = document.createElement("button");

      document.body.append(divContainer);
      divContainer.append(div);
      div.append(button);
      div.append(ul);
      div.append(buttonReset);
      div.append(nightButton);
      div.append(joker);
      div.append(cardAdd);
      div.append(cardRemove);

      divContainer.classList.add("container");
      div.classList.add("game__wrapper");
      ul.classList.add("game__ul");
      button.classList.add("game__button");
      buttonReset.classList.add("game__button-reset");
      nightButton.classList.add("night", "btn-reset");
      joker.classList.add("btn-reset", "joker");
      cardAdd.classList.add("btn-reset", "game__card-add");
      cardRemove.classList.add("btn-reset", "game__card-remove");

      buttonReset.textContent = "Еще разок";
      button.textContent = "Начать игру";

      const startGameButton = document.querySelector(".game__button");
      const resetGameButton = document.querySelector(".game__button-reset");

      function deleteAllCards() {
        const lists = document.querySelectorAll(".game__list");
        for (const list of lists) {
          list.remove();
        }
      }

      function createList(cards) {
        const lists = document.querySelectorAll(".game__list");
        const ul = document.querySelector(".game__ul");
        const shuffledIds = shuffle(createNumbersArray(cards / 2));
        let firstCard = null;
        let secondCard = null;


        for (let i = 0; i < cards ; i++) {
            const amazingCard = new AmazingCard(ul, shuffledIds[i])
        }

        
        return ul;
      }

      document
        .querySelector(".game__ul")
        .addEventListener("click", function (event) {
          const clickedElement = event.target;
          
          if (clickedElement.classList.contains("list__button")) {
            const li = clickedElement.parentElement;
            if (firstCard !== null && secondCard !== null) {
              return;
            }

            if (firstCard === null && secondCard === null) {
              li.classList.add("back");
              // clickedElement.textContent = li.dataset.number;
            }
            if (firstCard == null) {
              firstCard = li.dataset.number;
            } else {
              li.classList.add("back");
              secondCard = li.dataset.number;
              // clickedElement.textContent = li.dataset.number;
            }

            let cards = document.querySelectorAll(".back");
            let one = cards[0];
            let two = cards[1];

            if (firstCard !== null && secondCard !== null) {
              // обе карты открыты
              let firstCardNum = firstCard;
              let secondCardNum = secondCard;
              if (firstCardNum !== secondCardNum) {         
                setTimeout(() => {
                  two.classList.remove("back");
                  one.classList.remove("back");
                  firstCard = null
                  secondCard = null
                  one.firstChild.textContent = "";
                  two.firstChild.textContent = "";
                }, 1300);
              }
              if (firstCardNum === secondCardNum) {
                setTimeout(() => {
                  one.classList.remove("back", "delete");
                  one.firstChild.disabled = true;
                  one.classList.add("clear");
                  firstCard = null;
                  two.classList.remove("back", "delete");
                  two.firstChild.disabled = true;
                  two.classList.add("clear");
                  secondCard = null;          
                }, 2000);

                checkAllCards = false;

                const listWitchClass = document.querySelectorAll(".delete");
                if (listWitchClass.length == 2) {
                  checkAllCards = true;
                }

                if (checkAllCards) {
                  const modalWrapper =
                    document.querySelector(".modal__wrapper");
                  const modalWindow = document.querySelector(".modal__window");
                  const modalBtn = document.querySelector(".modal__button");
                  const modalBtnClose = document.querySelector(
                    ".modal__button-close"
                  );
                  setTimeout(() => {
                    modalWrapper.classList.remove("hidden");
                    modalWindow.classList.remove("hidden");
                  }, 2700);
                  modalBtn.addEventListener("click", () => {
                    modalWrapper.classList.add("hidden");
                    modalWindow.classList.add("hidden");
                    resetGameButton.click();
                    startGameButton.click();
                  });
                  modalBtnClose.addEventListener("click", () => {
                    window.close();
                  });
                }
              }
            }
          }
        });

      function deleteList() {
        const lists = document.querySelectorAll(".game__list");
        for (let i = 0; i < lists.length; i++) {
          if (lists.length == 12) {
            deleteAllCards();
            createList(8);
            cardAdd.classList.add("game__card-prop");
          } else if (lists.length == 8) {
            deleteAllCards();
            createList(4);
            ul.classList.remove("game__ul-grid-columns");
            cardRemove.classList.remove("game__card-prop");
            cardAdd.classList.add("game__card-prop");
          }
        }
      }

      startGameButton.addEventListener("click", function startGame() {
        const lists = document.querySelectorAll(".game__list");
        const element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          // Firefox
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          // Chrome, Safari and Opera
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          // IE/Edge
          element.msRequestFullscreen();
        }
        if (lists.length == 0) {
          const lists = document.querySelectorAll(".game__list");
          if (lists.length < 8) {
            ul.classList.add("game__ul-grid-columns");
            createList(8);
          }
          cardAdd.classList.add("game__card-prop");
          cardRemove.classList.add("game__card-prop");
        }
        firstCard = null;
        secondCard = null;
      });

      resetGameButton.addEventListener("click", () => {
        deleteAllCards();
        ul.classList.remove("game__ul-grid-columns");
        cardAdd.classList.remove("game__card-prop");
        cardRemove.classList.remove("game__card-prop");
        firstCard = null;
        secondCard = null;
      });

      cardAdd.addEventListener("click", () => {
        const lists = document.querySelectorAll(".game__list");
        if (lists.length == 4) {
          ul.classList.add("game__ul-grid-columns");
          ul.classList.remove("game__ul-grid-pl");
          deleteAllCards();
          createList(8);
          cardRemove.classList.add("game__card-prop");
        } else if (lists.length == 8) {
          ul.classList.add("game__ul-grid-columns");
          ul.classList.remove("game__ul-grid-pl");
          deleteAllCards();
          createList(12);
          cardRemove.classList.add("game__card-prop");
          cardAdd.classList.remove("game__card-prop");
        }
      });

      cardRemove.addEventListener("click", () => {
        deleteList(4);
      });

      const themeButton = document.querySelector(".night");
      themeButton.addEventListener("click", () => {
        let darkLink = document.getElementById("dark-theme");
        if (!darkLink) {
          let link = document.createElement("link");
          link.id = "dark-theme";

          link.setAttribute("rel", "stylesheet");
          link.setAttribute("href", "./css/night-style.css");

          document.head.append(link);
          saveTheme("dark");
        } else {
          darkLink.remove();
        }
      });

      const jokerBack = document.querySelector(".joker");
      jokerBack.addEventListener("click", () => {
        let jokerTheme = document.getElementById("joker-theme");

        if (!jokerTheme) {
          let link = document.createElement("link");
          link.id = "joker-theme";

          link.setAttribute("rel", "stylesheet");
          link.setAttribute("href", "./css/joker-style.css");

          document.head.append(link);
          saveTheme("joker");
        } else {
          jokerTheme.remove();
        }
      });

      const savedTheme = getSavedTheme();
      if (savedTheme === "dark") {
        themeButton.click();
      } else if (savedTheme === "joker") {
        jokerBack.click();
      }
    }
  }

  const startGameButton = document.querySelector(".game__start-button");
  const mainDiv = document.querySelector(".game");
  startGameButton.addEventListener("click", () => {
    startGame();
    mainDiv.remove();
  });
})();
