"use strict";
import { Octokit } from "https://esm.sh/@octokit/core";
// const { Octokit } = require('@octokit/core');

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const errorP = document.querySelector(".error");
const textName = document.querySelector(".username");
const btnName = document.querySelector(".btnUser");
const formDiv = document.querySelector(".form");
const containerDiv = document.querySelector(".container");

let name = "";

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

btnName.addEventListener("click", hideForm);

function hideForm() {
  name = textName.value;
  if (name !== "")  {
    console.log(name);
    formDiv.style.display = "none";
    containerDiv.style.display = "flex";
  } else {
    errorP.innerHTML = "Put your damn name!";
  }
 
}

async function handleYesClick() {
  titleElement.innerHTML = "Yayyy!! :3";
  buttonsContainer.classList.add("hidden");
  catImg.src = `img/cat-yes.jpg`;
  containerDiv.style.backgroundColor = "#68062d";

  // Octokit.js
// https://github.com/octokit/core.js#readme.
  try {
    const octokit = new Octokit({
      auth: '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'
    })

    const createIssueResponse = await octokit.request('POST /repos/LordByron00/YouWillBeMyValentines/issues', {
      owner: 'LordByron00',
      repo: 'YouWillBeMyValentines',
      title: 'user: ' + name,
      body: 'Yes, I will be your valentines. ' + btnCount + ' NOs',
      assignees: ['LordByron00'],
      // milestone: 1,
      labels: ['documentation'],
  });
  } catch (error) {
    console.error('Error creating issue:', error.message);
  }
  // console.log(createIssueResponse.data.html_url);
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
