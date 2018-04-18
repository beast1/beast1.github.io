(function () {
'use strict';

const getElement = (html) => {
  const template = document.createElement(`div`);
  template.innerHTML = html;
  return template;
};

const changeView = (view) => {
  const parent = document.querySelector(`main.central`);
  parent.innerHTML = ``;
  parent.appendChild(view.element);
};

class AbstractView {
  get template() {
    console.error(`You have define template for view`);
  }
  render() {
    return getElement(this.template);
  }
  bind() {}
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}

const getFooterTemplate = () => {
  return `
    <footer class="footer">
      <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
      <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
      <div class="footer__social-links">
        <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
        <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
        <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
        <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
      </div>
    </footer>
  `;
};

class IntroView extends AbstractView {
  get template() {
    return `
      <div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>
      ${getFooterTemplate()}
    `;
  }

  bind() {
    const btnContinue = this.element.querySelector(`.intro__asterisk`);
    btnContinue.addEventListener(`click`, () => this.onContinue());
  }

  onContinue() {

  }
}

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    changeView(this.view);
    this.view.onContinue = () => {
      Application.showGreeting();
    };
  }
}

var introScreen = new IntroScreen();

class GreetingView extends AbstractView {
  get template() {
    return `
      <div class="greeting central--blur">
        <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
          <p>Правила игры просты.<br>
            Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
            Задача кажется тривиальной, но не думай, что все так просто.<br>
            Фотореализм обманчив и коварен.<br>
            Помни, главное — смотреть очень внимательно.</p>
        </div>
        <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
      </div>
      ${getFooterTemplate()}
    `;
  }

  bind() {
    const btnContinue = this.element.querySelector(`.greeting__continue`);
    btnContinue.addEventListener(`click`, () => this.onContinue());
  }

  onContinue() {

  }
}

class GreetingScreen {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    this.view.onContinue = () => Application.showRules();
    changeView(this.view);
  }
}

var greetingScreen = new GreetingScreen();

const AnswerTypes = {
  SLOW: `slow`,
  FAST: `fast`,
  CORRECT: `correct`,
  WRONG: `wrong`,
  UNKNOWN: `unknown`
};

const AnswerTypesPrices = {
  [AnswerTypes.SLOW]: 50,
  [AnswerTypes.FAST]: 150,
  [AnswerTypes.CORRECT]: 100,
  [AnswerTypes.WRONG]: 0,
  [AnswerTypes.UNKNOWN]: 0
};

const LevelTypes = {
  DOUBLE: `double`,
  TRIPLE: `triple`,
  WIDE: `wide`
};

const InitialState = {
  LEVEL: 0,
  LIVES: 3,
  POINTS: 0,
  TIME: 6
};

const initialState = () => {
  return {
    level: InitialState.LEVEL,
    lives: InitialState.LIVES,
    points: InitialState.POINTS,
    time: InitialState.TIME,
    history: new Array(10).fill(`unknown`)
  };
};

const getLevels = () => {
  const levelTemplates = [{
    levelType: LevelTypes.DOUBLE,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [{
      image: {
        src: `http://www.kartinki.me/images/201312/kartinki.me_16611.jpg`,
        width: 468,
        height: 458
      },
      type: `photo`
    }, {
      image: {
        src: `http://www.fresher.ru/manager_content/images/fotorealistichnye-kartiny-italyanca-mikele-del-kampo/big/18.jpg`,
        width: 468,
        height: 458
      },
      type: `paint`
    }]
  }, {
    levelType: LevelTypes.TRIPLE,
    task: `Найдите рисунок среди изображений`,
    options: [{
      image: {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        width: 304,
        height: 455
      },
      type: `photo`
    }, {
      image: {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 304,
        height: 455
      },
      type: `paint`
    }, {
      image: {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 304,
        height: 455
      },
      type: `photo`
    }]
  }, {
    levelType: LevelTypes.WIDE,
    task: `Угадай, фото или рисунок?`,
    options: [{
      image: {
        src: `http://www.fresher.ru/manager_content/images/fotorealistichnye-kartiny-italyanca-mikele-del-kampo/big/18.jpg`,
        width: 705,
        height: 455
      },
      type: `photo`
    }]
  }];
  let levels = [];
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  for (let i = 0; i < 10; i++) {
    levels.push(levelTemplates[getRandomInt(0, 3)]);
  }
  console.log(levels);
  return levels;
};

// в проде будет запрос к БД
const levels = getLevels();

const createGetPoints = () => {
  const LIVES_PRICE = 50;
  const answerTypePrices = {
    unknown: 0,
    wrong: 0,
    slow: 50,
    correct: 100,
    fast: 150
  };
  const answerTypesArr = Object.keys(answerTypePrices);
  const getPoints = (answersArr, livesCount) => {
    if (livesCount === -1) {
      return -1;
    }
    let points = LIVES_PRICE * livesCount;
    for (let i = 0; i < answersArr.length; i++) {
      for (let j = 0; j < answerTypesArr.length; j++) {
        if (answerTypesArr[j] === answersArr[i]) {
          points += answerTypePrices[answerTypesArr[j]];
        }
      }
    }
    return points;
  };
  return getPoints;
};
const getPoints = createGetPoints();

const getHeaderTemplate = (state) => {
  const defaultHtml = `
      <header class="header">
        <div class="header__back">
          <button class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.svg" width="101" height="44">
          </button>
        </div>
      </header>
    `;
  if (typeof state === `undefined`) {
    return defaultHtml;
  }
  const stateHtml = `
    ${defaultHtml}
    <h1 class="game__timer">time:${state.time} lvl:${state.level} pts:${state.points}</h1><!--NN-->
    <div class="game__lives">
      ${new Array(3 - state.lives === 4 ? 3 : 3 - state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      ${state.lives >= 0 ? new Array(state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``) : ``}
    </div>
  `;
  return stateHtml;
};

const getLevelTemplate = (state, level) => {
  return `
    <div class="game">
      <p class="game__task">${level.task}</p>
      <form class="game__content  game__content--${level.levelType}">
        ${new Array(level.options.length).fill(``).map((item, i) => {
            const option = level.options[i];
            if (level.levelType === `triple`) {
              return `
                <div class="game__option" data-option="${i}">
                  <img src="${option.image.src}" alt="Option ${i}" width="${option.image.width}" height="${option.image.height}">
                </div>
              `;
            } else {
              return `
                <div class="game__option">
                  <img src="${option.image.src}" alt="Option ${i}" width="${option.image.width}" height="${option.image.height}">
                  <label class="game__answer  game__answer--photo">
                    <input name="question${i}" type="radio" value="photo">
                    <span>Фото</span>
                  </label>
                  <label class="game__answer  game__answer--paint">
                    <input name="question${i}" type="radio" value="paint">
                    <span>Рисунок</span>
                  </label>
                </div>
              `;
            }
          }).join(``)}
        </form>
        <div class="stats">
          <ul class="stats">${state.history.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
        </ul>
      </div>
    </div>
  `;
};

class LevelView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.level = levels[this.state.level];
  }
  get template() {
    return `
      ${getHeaderTemplate(this.state)}
      ${getLevelTemplate(this.state, this.level)}
      ${getFooterTemplate()}
    `;
  }
  bind() {
    const btnBack = this.element.querySelector(`.back`);
    const form = this.element.querySelector(`.game__content`);
    const fields = form.querySelectorAll(`.game__option`);
    this.timerElem = this.element.querySelector(`.game__timer`);
    btnBack.addEventListener(`click`, () => this.onBack());
    form.addEventListener(`click`, (e) => {
      if (e.target.classList.contains(`game__option`) && this.level.levelType === LevelTypes.TRIPLE) {
        this.onAnswer(this.level.options[e.target.dataset.option].type === `paint`);
      } else {
        const checkedInputs = Array.from(form.querySelectorAll(`input[type="radio"]:checked`));
        if (checkedInputs.length === fields.length) {
          this.onAnswer(checkedInputs.every((checkedInput, i) => checkedInput.value === this.level.options[i].type));
        }
      }
    });
  }
  onBack() {}
  onAnswer() {}
  updTime(time) {
    this.timerElem.textContent = time;
  }
}

class GameScreen {
  init(state) {
    this.view = new LevelView(state);
    changeView(this.view);
    this.state = state;
    let timer;

    const timerTick = () => {
      timer = setTimeout(() => {
        state.time -= 1;
        if (state.time === -1) {
          this.view.onAnswer(false);
        } else {
          this.view.updTime(state.time);
          timerTick();
        }
      }, 1000);
    };
    timerTick();

    this.view.onBack = () => {
      clearTimeout(timer);
      Application.showGreeting();
    };
    this.view.onAnswer = (isTrueAnswer) => {
      clearTimeout(timer);
      const nextState = Object.assign({}, state);
      nextState.time = InitialState.TIME;
      if (isTrueAnswer) {
        if (state.time >= (InitialState.TIME / 3 * 2)) {
          nextState.history[nextState.level] = `fast`;
          nextState.points += 150;
        } else if (state.time >= 10) {
          nextState.history[nextState.level] = `correct`;
          nextState.points += 100;
        } else if (state.time >= 0) {
          nextState.history[nextState.level] = `slow`;
          nextState.points += 50;
        }
      } else {
        nextState.history[nextState.level] = `wrong`;
        nextState.lives -= 1;
      }
      nextState.level += 1;
      if (state.level === 9 || nextState.lives === -1) {
        Application.showStats(nextState);
      } else {
        Application.startGame(nextState);
      }
    };
  }
}

var gameScreen = new GameScreen();

class RulesView extends AbstractView {
  get template() {
    return `
      <div class="rules">
        ${getHeaderTemplate()}
        <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
          src="img/photo_icon.png" width="16" height="16"> или рисунок <img
          src="img/paint_icon.png" width="16" height="16" alt="">.<br>
          Фотографиями или рисунками могут быть оба изображения.<br>
          На каждую попытку отводится 30 секунд.<br>
          Ошибиться можно не более 3 раз.<br>
          <br>
          Готовы?
        </p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit">Go!</button><!--disabled-->
        </form>
      </div>
      ${getFooterTemplate()}
    `;
  }
  bind() {
    const btnBack = this.element.querySelector(`.back`);
    const btnContinue = this.element.querySelector(`.rules__button.continue`);
    btnBack.addEventListener(`click`, () => this.onBack());
    btnContinue.addEventListener(`click`, () => this.onContinue());
  }
  onBack() {}
  onContinue() {}
}

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    changeView(this.view);
    this.view.onBack = () => Application.showGreeting();
    this.view.onContinue = () => Application.startGame();
  }
}

var rulesScreen = new RulesScreen();

const getStatsTemplate = (state) => {
  const finalResult = getPoints(state.history, state.lives);
  const isWin = !(finalResult === -1);
  const answerTypesCounter = {
    [AnswerTypes.FAST]: state.history.filter((item) => item === AnswerTypes.FAST).length,
    [AnswerTypes.SLOW]: state.history.filter((item) => item === AnswerTypes.SLOW).length,
  };
  return `
    <div class="result">
      <h1>${isWin ? `Победа!` : `Поражение`}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            <ul class="stats">
              ${state.history.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
            </ul>
          </td>
          <td class="result__points">× 100</td>
          <td class="result__total">${isWin ? state.points : `Fail`}</td><!--900-->
        </tr>
        ${isWin ?
          `
            <tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">${answerTypesCounter.fast} <span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">× ${AnswerTypesPrices.fast}</td>
            <td class="result__total">${answerTypesCounter.fast * AnswerTypesPrices.fast}</td>
            </tr>
            <tr>
              <td></td>
              <td class="result__extra">Бонус за жизни:</td>
              <td class="result__extra">${state.lives} <span class="stats__result stats__result--alive"></span></td>
              <td class="result__points">× 50</td>
              <td class="result__total">${50 * state.lives}</td>
            </tr>
            <tr>
            <td></td>
            <td class="result__extra">Штраф за медлительность:</td>
            <td class="result__extra">${answerTypesCounter.slow} <span class="stats__result stats__result--slow"></span></td>
            <td class="result__points">× ${AnswerTypesPrices.slow}</td>
            <td class="result__total">-${answerTypesCounter.slow * AnswerTypesPrices.slow}</td>
            </tr>
          `
          :
          ``
          }
        <tr>
          <td colspan="5" class="result__total  result__total--final">${isWin ? finalResult : state.points}</td>
        </tr>
      </table>
    </div>
  `;
};

class StatsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    return `
      ${getHeaderTemplate(this.state)}
      ${getStatsTemplate(this.state)}
      ${getFooterTemplate()}
    `;
  }
  bind() {
    const btnBack = this.element.querySelector(`.back`);
    btnBack.addEventListener(`click`, () => this.onBack());
  }
  onBack() {}
}

class StatsScreen {
  init(state) {
    this.view = new StatsView(state);
    changeView(this.view);
    this.view.onBack = () => {
      Application.showGreeting();
    };
  }
}

var statsScreen = new StatsScreen();

const ControllerId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

const loadState = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return e;
  }
};

class Application {
  static init() {
    this.Route = {
      [ControllerId.INTRO]: introScreen,
      [ControllerId.GREETING]: greetingScreen,
      [ControllerId.RULES]: rulesScreen,
      [ControllerId.GAME]: gameScreen,
      [ControllerId.STATS]: statsScreen
    };
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);

      this.changeHash(id, decodeURI(data));
    };

    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }
  static changeHash(id, data) {
    const controller = this.Route[id];

    if (controller) {
      if (!data) {
        controller.init();
      } else {
        controller.init(loadState(data));
      }
    }
  }
  static showIntro() {
    location.hash = ControllerId.INTRO; // introScreen.init();
  }
  static showGreeting() {
    location.hash = ControllerId.GREETING; // greetingScreen.init();
  }
  static showRules() {
    location.hash = ControllerId.RULES; // rulesScreen.init();
  }
  static startGame(state = initialState()) {
    location.hash = `${ControllerId.GAME}?${JSON.stringify(state)}`; // gameScreen.init(state);
  }
  static showStats(state = initialState()) {
    location.hash = `${ControllerId.STATS}?${JSON.stringify(state)}`; // statsScreen.init(state);
  }
}

window.addEventListener(`load`, () => {
  Application.init();
});

}());

//# sourceMappingURL=main.js.map
