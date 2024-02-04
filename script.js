"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");
const messages = [
  "No",
  "Are you sure?",
  "Pookie please",
  "Don't do this to me :(",
  "You're breaking my heart",
  "I'm gonna cry...",
  "Puppy eyes activated, how about a yes?",
  "Nuh-uh",
  "Oh, fluffy muffins, say yes?",
  "Don't be a heartbreaker :(",
  "Please don't be a dream crusher",
  "Tiny teardrops forming...",
  "Really, really? :("
];

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (noCount < MAX_IMAGES) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    // if (noCount === MAX_IMAGES) {
      //   play = false;
      // }
    }
    updateNoButtonText();
    resizeYesButton();
});

function handleYesClick() {
  titleElement.innerHTML = "Yayyy!! :3";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize + 60;
  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage() {
  // const messageIndex = Math.min(noCount, messages.length - 1);
  const index = Math.floor(Math.random() * messages.length);
  console.log(index);
  const message = messages[index];
  console.log(message);
  return message;
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage();
}
