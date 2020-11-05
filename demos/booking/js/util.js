'use strict';

const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
const hideNode = (node) => {
  node.style.display = `none`;
};
const showNode = (node) => {
  node.style.display = `block`;
};
const drawTextBlock = (className, text, parent = document) => {
  const node = parent.querySelector(className);
  if (node && text) {
    node.textContent = text;
  } else if (node) {
    window.hideNode(node);
  }
};
const mapOffsetCheck = (number, axis) => {
  if (number < window.data.mapOverlay[axis].START) {
    number = window.data.mapOverlay[axis].START;
  } else if (number > window.data.mapOverlay[axis].END) {
    number = window.data.mapOverlay[axis].END;
  }
  return number;
};
const showUserMessage = (blockName, message) => {
  const template = document.querySelector(`#${blockName}`);
  const markup = template.content.querySelector(`.${blockName}`).cloneNode(true);
  const action = markup.querySelector(`.${blockName}__button`);
  drawTextBlock(`.${blockName}__message`, message, markup);
  document.querySelector(`body`).appendChild(markup);
  if (action) {
    action.addEventListener(`click`, () => location.reload());
  }
  if (markup) {
    markup.addEventListener(`click`, () => hideNode(markup));
    document.addEventListener(`keydown`, (event) => {
      if (event.key === `Escape`) {
        hideNode(markup);
      }
    });
  }
};
const contains = (where, what) => {
  for (let i = 0; i < what.length; i++) {
    if (where.indexOf(what[i]) === -1) {
      return false;
    }
  }
  return true;
};
const findAndRemove = (arr, targetItem) => {
  arr.splice(arr.findIndex((item) => {
    return item === targetItem;
  }), 1);
};
const changeDisabledAttr = (node, state) => {
  if (state) {
    node.setAttribute(`disabled`, `true`);
  } else {
    node.removeAttribute(`disabled`);
  }
};
window.util = {
  randomInteger,
  hideNode,
  showNode,
  drawTextBlock,
  mapOffsetCheck,
  showUserMessage,
  contains,
  findAndRemove,
  changeDisabledAttr
};
