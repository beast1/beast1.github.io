const getData = (callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "./js/data/data.json");
  xhr.send();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(JSON.parse(this.responseText))
    }
  };
}
const renderWeek = () => {
  const parent = document.querySelector(`main.schedule`);
  const weekHtml = `
    <button class="schedule__clean">Clean</button>
    <button class="schedule__save">Save</button>  
    <small>*В ТЗ нет url на который нужно отправить результат сохранения, так что я просто дропнул объект в консоль</small>
  `;
  const template     = document.createElement(`template`);
  template.innerHTML = weekHtml;
  parent.appendChild(template.content.cloneNode(true));
}
const renderDay = (name, hours) => {
  const parent = document.querySelector(`main.schedule`);
  const btnAllDayHtml = (hours) => {
    if (hours.filter(item => item === false).length === 0) {
      return `<div class="schedule__all-day  schedule__all-day_checked"></div>`
    } else {
      return `<div class="schedule__all-day"></div>`
    }
  }
  const dayHtml = `   
      <div class="schedule__day  schedule__day_${name}">
        <div class="schedule__label">${name}</div>
        ${btnAllDayHtml(hours)}
        <div class="schedule__hours-list">
          ${
            hours.map((hour) => {
              if (hour === true) {
                return `<div class="schedule__hours-item  schedule__hours-item_checked"></div>`
              } else {
                return `<div class="schedule__hours-item"></div>`
              }
            }).join(``)
          }
        </div>
      </div>
    `;
  const template     = document.createElement(`template`);
  template.innerHTML = dayHtml;
  parent.appendChild(template.content.cloneNode(true));
}
// paint/clean
class Day {
  constructor(name, sockets) {
    this.sockets       = sockets;
    this.root          = document.querySelector(`.schedule__day_${name}`);
    this.hourToggleArr = this.root.querySelectorAll(`.schedule__hours-item`);
    this.dayToggle     = this.root.querySelector(`.schedule__all-day`);
    this.hourToggleArr.forEach(item => {
      item.addEventListener(`click`, (e) => {
        e.target.classList.toggle(`schedule__hours-item_checked`);
        this.dayToggle.classList.remove(`schedule__all-day_checked`);
        this.updateSockets();
      });
    });
    this.dayToggle.onclick = () => {
      if (this.dayToggle.classList.contains(`schedule__all-day_checked`)) {
        this.hourToggleArr.forEach((item) => {
          item.classList.remove(`schedule__hours-item_checked`);
        });
        this.dayToggle.classList.remove(`schedule__all-day_checked`);
        this.updateSockets();
      } else {
        this.hourToggleArr.forEach((item) => {
          item.classList.add(`schedule__hours-item_checked`);
        });
        this.dayToggle.classList.add(`schedule__all-day_checked`);
        this.updateSockets();
      }
    };
  }

  updateSockets() {
    this.hourToggleArr.forEach((item, i) => {
      if (item.classList.contains(`schedule__hours-item_checked`)) {
        this.sockets[i] = true;
      } else {
        this.sockets[i] = false;
      }
    });
  }

  cleanDay() {
    this.dayToggle.classList.remove(`schedule__all-day_checked`);
    this.hourToggleArr.forEach((item) => {
      item.classList.remove(`schedule__hours-item_checked`);
    })
    this.updateSockets();
  }
}
class Week {
  constructor(days) {
    this.days = days;
    this.btnClean = document.querySelector(`.schedule__clean`);
    this.btnClean.onclick = (e) => this.clean(e);
    this.btnSave = document.querySelector(`.schedule__save`);
    this.btnSave.onclick = (e) => this.save(e);
  }

  clean() {
    Object.keys(this.days).map((day) => {
      this.days[day].cleanDay();
      this.days[day].updateSockets();
    });
  }

  save() {
    const savedData = {};
    const socketToMinutes = (socket, isBt) => {
      if (socket === 0) {
        return 0;
      } else if (isBt) {
        return Math.floor((socket - 1) * 60);
      } else {
        return Math.floor((socket - 1) * 60) - 1;
      }
    }
    const matchDayIntervals = (sockets) => {
      const intervals = [];
      let isBeginSearch = true;
      let fromIndex = 0;
      let intervalCounter = 0;
      for (let i = fromIndex; i < sockets.length; i++) {
        if (sockets[i] === isBeginSearch) {
          if (isBeginSearch) {
            intervals.push({});
            intervals[intervalCounter].bt = socketToMinutes(i, true);
          } else {
            intervals[intervalCounter].et = socketToMinutes(i, false);
            intervalCounter = intervalCounter + 1;
          }
          isBeginSearch = !isBeginSearch;
          fromIndex = i - 1;
        } else if (i + 1 === sockets.length && isBeginSearch === false) {
          intervals[intervalCounter].et = socketToMinutes(i + 2, false);
        }
      }
      return intervals;
    };
    Object.keys(this.days).map((day) => {
      savedData[day] = matchDayIntervals(this.days[day].sockets);
    });
    console.dir(savedData);
  }
}

getData((response) => {
  const days = [];
  Object.keys(response).map((item) => {
    const sockets = [];
    for (let i = 0; i < 24; i++) {
      sockets.push(false);
    }
    for (let i = 0; i < response[item].length; i++) {
      for (let j = 0; j < sockets.length; j++) {
        if (j >= Math.ceil((response[item][i].bt + 1) / 60)) {
          if (j <= Math.ceil((response[item][i].et + 1) / 60)) {
            sockets[j] = true;
          }
        } else if (j === response[item][i].bt) {
          sockets[j] = true;
        }
      }
    }
    renderDay(item, sockets);
    days[item] = new Day(item, sockets);
  });
  renderWeek();
  new Week(days);
});




//# sourceMappingURL=main.js.map
