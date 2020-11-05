'use strict';

const HOUSES_DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const houseDataPatterns = {
  types: [`palace`, `flat`, `house`, `bungalow`],
  checkin: [`12:00`, `13:00`, `14:00`],
  features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]
};

const pinOffset = {
  X: 25,
  Y: 70
};

const mapOverlayNode = document.querySelector(`.map__overlay`);
const largestPin = document.querySelector(`.map__pin--main`);
const mapOverlay = {
  y: {
    START: 130,
    END: 630
  },
  x: {
    START: 0 - largestPin.offsetWidth / 2,
    END: mapOverlayNode.offsetWidth - largestPin.offsetWidth / 2
  }
};

const pinTextContent = {
  TITLE: `Уютный очаг на краю города`,
  DESCRIPTION: `Теплое место, последнее пристанище расплавленного ума`
};

const messages = {
  filter: {
    noResult: `Объявления которые соответствуют заданным фильтрам не были найдены`
  },
  http: {
    success: `Ваша заявка успешно отправлена`,
    errDefault: `Произошла ошибка соединения`,
    err400: `Неверный запрос`,
    err401: `Пользователь не авторизован`,
    err404: `Ничего не найдено`,
    status: `Статус ответа:`,
    timeout: {
      pre: `Запрос не успел выполниться за`,
      post: `мс`
    }
  }
};

const statusDictionary = {
  success: 200,
  badRequest: 400,
  missingAuth: 401,
  notFound: 404
};

const generateLocation = () => {
  return {
    x: window.util.randomInteger(mapOverlay.x.START, mapOverlay.x.END),
    y: window.util.randomInteger(mapOverlay.y.START + pinOffset.Y, mapOverlay.y.END)
  };
};

const generateFeatures = (houseRandomData) => {
  return houseRandomData.features.filter(() => window.util.randomInteger(0, 1));
};

const generatePhotos = (houseRandomData) => {
  return houseRandomData.photos.filter(() => window.util.randomInteger(0, 1));
};

const generateHousesData = (houseRandomData, pinsCount) => {
  const pins = [];

  for (let i = 0; i < pinsCount; i++) {
    const location = generateLocation();

    pins.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: pinTextContent.TITLE,
        address: `${location.x}, ${location.y}`,
        price: window.util.randomInteger(999, 9999),
        type: houseRandomData.types[window.util.randomInteger(0, 3)],
        rooms: window.util.randomInteger(1, 5),
        guests: window.util.randomInteger(1, 8),
        checkin: houseRandomData.checkin[window.util.randomInteger(0, 2)],
        checkout: houseRandomData.checkin[window.util.randomInteger(0, 2)],
        features: generateFeatures(houseRandomData),
        description: pinTextContent.DESCRIPTION,
        photos: generatePhotos(houseRandomData)
      },
      location: {
        x: location.x,
        y: location.y
      }
    });
  }

  return pins;
};

const addFrontId = (houses) => {
  houses.forEach((house, i) => {
    house.frontId = i;
  });
  return houses;
};

const validateHousesResponse = (response) => response.filter((item) => item.offer);

const onSuccess = (response) => {
  window.data.houses = validateHousesResponse(addFrontId(response));
  window.controlPin.setActiveState();
};

const onError = (errorMessage) => {
  window.util.showUserMessage(`error`, errorMessage);
};

const loadHousesData = () => {
  window.http(`load`, HOUSES_DATA_URL, onSuccess, onError);
};

loadHousesData();
window.data = {
  mapOverlay,
  pinOffset,
  mockHouses: generateHousesData(houseDataPatterns, 8),
  messages,
  statusDictionary
};
