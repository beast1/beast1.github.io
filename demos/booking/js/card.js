'use strict';

const types = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const initCard = () => {
  const cardTemplate = document.querySelector(`#card`);
  const cardMarkup = cardTemplate.content.querySelector(`.map__card`).cloneNode(true);
  const cardCloseBtn = cardMarkup.querySelector(`.popup__close`);
  const filtersContainer = document.querySelector(`.map__filters-container`);
  const featuresParent = cardMarkup.querySelector(`.popup__features`);
  const featureMarkup = featuresParent.querySelector(`.popup__feature`).cloneNode(true);
  const photosParent = cardMarkup.querySelector(`.popup__photos`);
  const photoMarkup = photosParent.querySelector(`.popup__photo`).cloneNode(true);

  const drawCardFeatures = (data) => {
    if (data && featuresParent) {
      const featuresFragment = document.createDocumentFragment();
      data.forEach((feature) => {
        featureMarkup.className = `popup__feature popup__feature--${feature}`;
        featuresFragment.appendChild(featureMarkup);
      });
      featuresParent.innerHTML = ``;
      featuresParent.appendChild(featuresFragment);
    } else if (featuresParent) {
      window.util.hideNode(featuresParent);
    }
  };

  const drawCardPhotos = (data) => {
    if (data && photosParent) {
      const photosFragment = document.createDocumentFragment();
      data.forEach((photo) => {
        photoMarkup.src = photo;
        photosFragment.appendChild(photoMarkup);
      });
      photosParent.innerHTML = ``;
      photosParent.appendChild(photosFragment);
    } else if (photosParent) {
      window.util.hideNode(photosParent);
    }
  };

  const drawCardAvatar = (data) => {
    const avatar = cardMarkup.querySelector(`.popup__avatar`);
    if (data && avatar) {
      avatar.src = data;
    } else if (avatar) {
      window.util.hideNode(avatar);
    }
  };

  const closeCard = () => {
    window.pin.removeActiveStyles();
    window.card.clear();
  };

  const onCardCloseBtnClick = (event) => {
    event.preventDefault();
    closeCard();
  };

  const onDocumentKeydown = (event) => {
    event.preventDefault();
    if (event.key === `Escape`) {
      closeCard();
    }
  };

  const drawCard = (housesData) => {
    window.util.drawTextBlock(`.popup__title`, housesData.offer.title, cardMarkup);
    window.util.drawTextBlock(`.popup__text--address`, housesData.offer.address, cardMarkup);
    window.util.drawTextBlock(`.popup__text--price`, `${housesData.offer.price}₽/ночь`, cardMarkup);
    window.util.drawTextBlock(`.popup__type`, types[housesData.offer.type], cardMarkup);
    window.util.drawTextBlock(`.popup__text--capacity`, `${housesData.offer.rooms} комнаты для ${housesData.offer.guests} гостей`, cardMarkup);
    window.util.drawTextBlock(`.popup__text--time`, `Заезд после ${housesData.offer.checkin}, выезд до ${housesData.offer.checkout}`, cardMarkup);
    drawCardFeatures(housesData.offer.features);
    window.util.drawTextBlock(`.popup__description`, housesData.offer.description, cardMarkup);
    drawCardPhotos(housesData.offer.photos);
    drawCardAvatar(housesData.author.avatar);

    filtersContainer.before(cardMarkup);
    cardMarkup.classList.remove(`hidden`);
    cardCloseBtn.addEventListener(`click`, onCardCloseBtnClick);
    document.addEventListener(`keydown`, onDocumentKeydown);
  };

  const clearCard = () => {
    cardMarkup.classList.add(`hidden`);
    cardCloseBtn.removeEventListener(`click`, onCardCloseBtnClick);
    document.removeEventListener(`click`, onDocumentKeydown);
  };

  return {
    draw: drawCard,
    clear: clearCard
  };
};

window.card = initCard();
