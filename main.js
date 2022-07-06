
const nameSpan = document.querySelector("span.name")
const namePrompt = document.querySelector(".name-prompt");

if (localStorage.name) {
  namePrompt.style.transform = "translateY(-100%)"
  nameSpan.textContent = localStorage.name;
}


document.querySelector(".change-name").onclick = () => {
  namePrompt.style.transform = "translateY(0)"
}

const nameBtn = namePrompt.lastElementChild;
const nameInput = document.getElementById("name-input");
nameBtn.onclick = () => {
  if (nameInput.value != "") {
    namePrompt.style.transform = "translateY(-100%)";
    localStorage.name = nameInput.value;
    nameSpan.textContent = nameInput.value;
    nameInput.value = "";
  }
};

const cardsContainer = document.querySelector(".cards-container");
const cards = Array.from(cardsContainer.children);

function rearrange() {
  cards.sort(() => .5 - Math.random());
  cardsContainer.innerHTML = "";
  cards.forEach((element) => {
    cardsContainer.appendChild(element)
  });
}
rearrange()

var counter = 1, rightAnswers = 0;
var firstId, secondId;
var cardsClicked = []
let finalResult = document.querySelector(".final-result");
let triesSpan = document.querySelector("span.tries-num");

cards.forEach((element) => {
  element.addEventListener('click', event => {
    let target = event.target;
    target.style.transform = "rotateY(180deg)"
    if (counter == 1) {
      firstId = target.dataset.id;
      cardsClicked[0] = target;
      counter++
    } else if (counter == 2) {
      cardsContainer.style.pointerEvents = "none"
      setTimeout(() => {
        cardsContainer.style.pointerEvents = "auto"
      }, 500)
      secondId = target.dataset.id;
      cardsClicked[1] = target
      if (firstId == secondId && !cardsClicked[0].isSameNode(cardsClicked[1])) {
        rightAnswers++
        cardsClicked[0].classList.add("flipped")
        target.classList.add("flipped")
        cardsClicked.length = 0;
        if (rightAnswers == cards.length / 2) {
          result(true)
          deleteFlipping()
        }
      } else {
        triesSpan.innerHTML = +triesSpan.innerHTML + 1;
        if (triesSpan.innerHTML == 10) {
          result(false)
          deleteFlipping()
        } else {
          deleteFlipping(cardsClicked)
        }
      }
      counter--
    }
  })
});


function result(_result) {
  triesSpan.innerHTML = 0;
  finalResult.style.transform = "translate(-50%, 0)"
  finalResult.innerHTML = _result ? "congrats !! you have won" :
    "you have lost"
  setTimeout(() => {
    finalResult.style.transform = "translate(-50%, -100%)"
    rearrange()
  }, 3000)
}

function deleteFlipping(cardsClicked) {
  if (cardsClicked) {
    setTimeout(() => {
      cardsClicked.forEach((element) => {
        element.style.transform = "rotateY(0)"
      });
      cardsClicked.length = 0;
    }, 1000)
  } else {
    setTimeout(() => {
      cards.forEach(element => {
        element.style.transform = "rotateY(0)";
      })
    }, 2000)
  }
}