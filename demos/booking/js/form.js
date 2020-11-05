'use strict';

const validationLimits = {
  MIN_NAME_LENGTH: 30,
  MAX_NAME_LENGTH: 100,
  type: [
    {name: `bungalow`, MIN_PRICE: 0},
    {name: `flat`, MIN_PRICE: 1000},
    {name: `house`, MIN_PRICE: 5000},
    {name: `palace`, MIN_PRICE: 10000}
  ],
  rooms: [
    {
      roomsCount: 1,
      guestOptions: [{value: 1, text: `для 1 гостя`}]
    },
    {
      roomsCount: 2,
      guestOptions: [{value: 1, text: `для 1 гостя`}, {value: 2, text: `для 2 гостей`}]
    },
    {
      roomsCount: 3,
      guestOptions: [{value: 1, text: `для 1 гостя`}, {value: 3, text: `для 3 гостей`}, {value: 2, text: `для 2 гостей`}]
    },
    {
      roomsCount: 100,
      guestOptions: [{value: 1, text: `не для гостей`}]
    }
  ],
  minPrice: 5000
};
const INITIAL_MIN_PRICE = 5000;
const OFFER_CATCHER_URL = ` https://21.javascript.pages.academy/keksobooking`;
const formNode = document.querySelector(`#ad-form`);
const priceInput = document.querySelector(`#price`);

const initRoomsValidate = () => {
  const roomsSelect = document.querySelector(`#room_number`);
  const capacitySelect = document.querySelector(`#capacity`);
  const capacityOption = document.querySelector(`#capacity option`);

  const roomsValidate = () => {
    validationLimits.rooms.forEach((limit) => {
      if (limit.roomsCount === +roomsSelect.value) {
        const guestOptionsFragment = document.createDocumentFragment();
        limit.guestOptions.forEach((guestOption) => {
          const guestOptionMarkup = capacityOption.cloneNode();
          guestOptionMarkup.innerText = guestOption.text;
          guestOptionMarkup.value = guestOption.value;
          guestOptionsFragment.appendChild(guestOptionMarkup);
        });
        capacitySelect.innerHTML = ``;
        capacitySelect.appendChild(guestOptionsFragment);
      }
    });
  };

  const onRoomsSelectInput = () => {
    roomsValidate();
  };

  roomsSelect.addEventListener(`input`, onRoomsSelectInput);
  roomsValidate();
};

const initCheckinValidate = () => {
  const checkinInput = document.querySelector(`#timein`);
  const checkoutInput = document.querySelector(`#timeout`);

  const updCheckoutValue = () => {
    checkoutInput.value = checkinInput.value;
  };
  const updCheckinValue = () => {
    checkinInput.value = checkoutInput.value;
  };
  const onCheckinInput = () => {
    updCheckoutValue();
  };

  checkinInput.addEventListener(`input`, onCheckinInput);
  checkoutInput.addEventListener(`input`, updCheckinValue);
};

const initMinPriceValidate = () => {
  const typeSelect = document.querySelector(`#type`);

  const typeMinPriceValidate = (event) => {
    validationLimits.type.forEach((type) => {
      if (type.name === event.target.value) {
        validationLimits.minPrice = type.MIN_PRICE;
        priceInput.attributes.min = validationLimits.minPrice;
        priceInput.placeholder = validationLimits.minPrice;
      }
    });
  };

  const minPriceValidate = () => {
    const value = priceInput.value;

    if (value < validationLimits.minPrice) {
      priceInput.setCustomValidity(`Минимальная цена выбранного типа апартаментов ${validationLimits.minPrice} руб.`);
    } else {
      priceInput.setCustomValidity(``);
    }

    priceInput.reportValidity();
  };

  const onTypeSelectInput = (event) => {
    typeMinPriceValidate(event);
    minPriceValidate();
  };
  const onPriceInput = () => {
    minPriceValidate();
  };

  typeSelect.addEventListener(`input`, onTypeSelectInput);
  priceInput.addEventListener(`input`, onPriceInput);
};

const resetMinPrice = () => {
  validationLimits.minPrice = INITIAL_MIN_PRICE;
  priceInput.placeholder = INITIAL_MIN_PRICE;
};

const initTitleValidate = () => {
  const titleInput = document.querySelector(`#title`);

  const onTitleInput = () => {
    const valueLength = titleInput.value.length;

    if (valueLength < validationLimits.MIN_NAME_LENGTH) {
      titleInput.setCustomValidity(`Ещё ${validationLimits.MIN_NAME_LENGTH - valueLength} симв.`);
    } else if (valueLength > validationLimits.MAX_NAME_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ${valueLength - validationLimits.MAX_NAME_LENGTH} симв.`);
    } else {
      titleInput.setCustomValidity(``);
    }

    titleInput.reportValidity();
  };

  titleInput.addEventListener(`input`, onTitleInput);
};

const initSubmit = () => {
  const onSuccess = (response) => {
    window.pin.close();
    window.card.clear();
    window.filter.reset();
    resetMinPrice();
    window.util.showUserMessage(`success`, response);
  };

  const onError = (message) => {
    window.util.showUserMessage(`error`, message);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    window.http(`upload`, OFFER_CATCHER_URL, onSuccess, onError, new FormData(formNode));
  };

  formNode.addEventListener(`submit`, onSubmit);
};

const initResetBtn = () => {
  const resetBtn = document.querySelector(`.ad-form__reset`);

  const resetForm = () => {
    formNode.reset();
    resetMinPrice();
  };
  const onResetBtnClick = (event) => {
    event.preventDefault();
    resetForm();
    window.pin.close();
    window.filter.reset();
    window.card.clear();
    window.controlPin.setAddress();
  };

  resetBtn.addEventListener(`click`, onResetBtnClick);
};

window.imgInput.init(`.ad-form__field input`, `.ad-form-header__preview img`);
window.imgInput.init(`.ad-form__upload input`, `.ad-form__photo`, true);
initResetBtn();

window.form = {
  rooms: {
    initValidation: initRoomsValidate
  },
  checkin: {
    initValidation: initCheckinValidate
  },
  minPrice: {
    initValidation: initMinPriceValidate
  },
  title: {
    initValidation: initTitleValidate
  },
  initSubmit
};
