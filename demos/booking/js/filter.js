'use strict';

const priceTypes = {
  LOW: 10000,
  MIDDLE: 50000,
  HIGH: 100000
};

const initialFilterSettings = {
  maxCount: 5,
  type: `any`,
  price: `any`,
  rooms: `any`,
  guests: `any`,
  features: []
};

let filterSettings = Object.assign({}, initialFilterSettings);
const form = document.querySelector(`#pins-filter`);

const initSelectFilter = (name) => {
  const select = form.querySelector(`#housing-${name}`);

  const onTypeSelectInput = (event) => {
    event.preventDefault();
    filterSettings[name] = select.value;
    submitFilter();
  };

  select.addEventListener(`input`, window.debounce(onTypeSelectInput));
};

const initCheckboxFilter = () => {
  const featuresCheckboxesFieldset = form.querySelector(`#housing-features`);
  const featuresCheckboxes = featuresCheckboxesFieldset.querySelectorAll(`input[name="features"]`);

  const onFeatureCheckboxInput = (event) => {
    event.preventDefault();
    const featureName = event.target.id.replace(/filter-/gi, ``);

    if (event.target.checked === true) {
      filterSettings.features.push(featureName);
    } else {
      window.util.findAndRemove(filterSettings.features, featureName);
    }

    submitFilter();
  };

  featuresCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener(`input`, window.debounce(onFeatureCheckboxInput));
  });
};

const convertPrice = (priceNumeric) => {
  let priceType;

  if (priceNumeric < priceTypes.LOW) {
    priceType = `low`;
  } else if (priceTypes.LOW <= priceNumeric && priceNumeric < priceTypes.MIDDLE) {
    priceType = `middle`;
  } else if (priceTypes.MIDDLE <= priceNumeric) {
    priceType = `high`;
  }

  return priceType;
};

const submitFilter = () => {
  let filteredHouses = window.data.houses;

  if (filterSettings.type !== `any`) {
    filteredHouses = filteredHouses.filter((house) => {
      return house.offer.type === filterSettings.type;
    });
  }

  if (filterSettings.price !== `any`) {
    filteredHouses = filteredHouses.filter((house) => {
      return convertPrice(+house.offer.price) === filterSettings.price;
    });
  }

  if (filterSettings.rooms !== `any`) {
    filteredHouses = filteredHouses.filter((house) => {
      return +house.offer.rooms === +filterSettings.rooms;
    });
  }

  if (filterSettings.guests !== `any`) {
    filteredHouses = filteredHouses.filter((house) => {
      return +house.offer.guests === +filterSettings.guests;
    });
  }

  if (filterSettings.features !== []) {
    filteredHouses = filteredHouses.filter((house) => {
      return window.util.contains(house.offer.features, filterSettings.features);
    });
  }

  if (filteredHouses.length === 0) {
    window.util.showUserMessage(`success`, window.data.messages.filter.noResult);
  } else {
    filteredHouses = filteredHouses.slice(0, filterSettings.maxCount);
    window.card.clear();
    window.pin.clear();
    window.pin.draw(filteredHouses);
  }
};

const resetFilters = () => {
  form.reset();
  filterSettings = Object.assign({}, initialFilterSettings);
};

initSelectFilter(`type`);
initSelectFilter(`price`);
initSelectFilter(`rooms`);
initSelectFilter(`guests`);
initCheckboxFilter();

window.filter = {
  submit: submitFilter,
  reset: resetFilters
};
