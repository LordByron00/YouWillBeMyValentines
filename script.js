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

const MAX_IMAGES = 7 + 1;
let imgNumTempt = 0;
let IDXTemp = 0;
let btnCount = 0;
yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
    changeImage();
    updateNoButtonText();
    resizeYesButton();
});

function handleYesClick() {
  titleElement.innerHTML = "Yayyy!! :3";
  buttonsContainer.classList.add("hidden");
  catImg.src = `img/cat-yes.jpg`;

  fetch('https://api.github.com/repos/LordByron00/YouWillBeMyValentines/issues', {
    method: 'POST',
    headers: {
        'Authorization': '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',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        title: 'New Data Entry',
        body: 'Yes',
    }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Data submitted successfully! Issue created: ' + data.html_url);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting data. Please try again.');
    });
}

function resizeYesButton() {
  btnCount++;
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize + 60;
  yesButton.style.fontSize = `${newFontSize}px`;

  const computedStyle2 = window.getComputedStyle(noButton);
  const fontSize2 = parseFloat(computedStyle2.getPropertyValue("font-size"));
  const newFontSize2 = fontSize2 - 1;
  noButton.style.fontSize = `${newFontSize2}px`;
  if (btnCount >= 15) {
    noButton.style.display = "none";
  }
}

function generateMessage() {
  let index = Math.floor(Math.random() * messages.length);
  while (IDXTemp === index) {
    index = Math.floor(Math.random() * messages.length);
  }
  IDXTemp = index;
  // console.log(index);
  const message = messages[index];
  console.log(message);
  return message;
}

function changeImage() {
  let newImgNum = Math.floor(Math.random() * MAX_IMAGES);
  while (imgNumTempt == newImgNum) {
    newImgNum = Math.floor(Math.random() * MAX_IMAGES)
  }
  imgNumTempt = newImgNum;
  catImg.src = `img/cat-${newImgNum}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage();
}
