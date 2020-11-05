'use strict';

const initPins = () => {
  const map = document.querySelector(`#map`);
  const pinsTemplate = document.querySelector(`#pin`);
  const pinsFragment = document.createDocumentFragment();
  const pinsParent = document.querySelector(`.map__pins`);
  const pins = [];

  const drawPins = (pinsStructuredData) => {
    pinsStructuredData.forEach((pinData) => {
      const pinMarkup = pinsTemplate.content.querySelector(`.map__pin`).cloneNode(true);
      const pinAvatar = pinMarkup.querySelector(`img`);

      pinAvatar.src = pinData.author.avatar;
      pinMarkup.style = `left: ${pinData.location.x - window.data.pinOffset.X}px; top: ${pinData.location.y - window.data.pinOffset.Y}px`;
      pinMarkup.attributes.src = pinData.author.avatar;
      pinMarkup.attributes.alt = pinData.offer.title;
      pinMarkup.dataset.frontId = pinData.frontId;
      pinsFragment.appendChild(pinMarkup);
      pins.push(pinMarkup);
    });

    pinsParent.appendChild(pinsFragment);
    pinsParent.addEventListener(`click`, onPinsParentClick);
    pinsParent.addEventListener(`keydown`, onPinsParentKeydown);
  };

  const clearPins = () => {
    pins.forEach((pin) => {
      pin.remove();
    });
  };

  const closePins = () => {
    map.classList.add(`map--faded`);
    clearPins();
    window.controlPin.setMapState(false);
    pinsParent.removeEventListener(`click`, onPinsParentClick);
    pinsParent.removeEventListener(`keydown`, onPinsParentKeydown);
  };

  const removeActiveStyles = () => {
    const showedPins = pinsParent.querySelectorAll(`.map__pin`);
    showedPins.forEach((pin) => {
      pin.classList.remove(`map__pin--active`);
    });
  };

  const onPinsParentClick = (event) => {
    const targetPin = event.target.offsetParent;
    if (targetPin) {
      if (targetPin.dataset.frontId) {
        removeActiveStyles();
        targetPin.classList.add(`map__pin--active`);
        window.card.draw(window.data.houses[event.target.offsetParent.dataset.frontId]);
      }
    }
  };

  const onPinsParentKeydown = (event) => {
    if (event.key === `Enter` && event.target.dataset.frontId) {
      window.card.draw(window.data.houses[event.target.dataset.frontId]);
    }
  };

  return {
    draw: drawPins,
    clear: clearPins,
    close: closePins,
    removeActiveStyles
  };
};

window.pin = initPins();
