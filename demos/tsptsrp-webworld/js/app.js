document.addEventListener("DOMContentLoaded", function() {

    // Сначала получаем высоту окна просмотра
// и умножаем ее на 1%
    let vh = window.innerHeight * 0.01;

// Затем устанавливаем значение свойства --vh
// для корневого элемента
    document.documentElement.style.setProperty('--vh', `${vh}px`);

	// Custom JS
    Splitting();

    /* COUNTER */
    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

    var totalSeconds = 0;

    setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        document.getElementById("seconds").innerHTML = pad(totalSeconds % 60);
        document.getElementById("minutes").innerHTML = pad(parseInt(totalSeconds / 60));
    }

    /* TIME IN FORMAT HH:MM:SS */
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    setInterval(getTime, 1000);

    function getTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        // add a zero in front of numbers < 10
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
        t = setTimeout(function() {
            getTime()
        }, 500);
    }

    var mySwiper = new Swiper('.swiper-container', {
        effect: 'flip',
        loop: true,
        hashNavigation: {
            watchState: true,
        }
        // If we need pagination
        // pagination: {
        // 	el: '.swiper-pagination',
        // },

        // Navigation arrows
        // navigation: {
        // 	nextEl: '.swiper-button-next',
        // 	prevEl: '.swiper-button-prev',
        // },

        // And if we need scrollbar
        // scrollbar: {
        // 	el: '.swiper-scrollbar',
        // },
    })

    function getRandomInt(min, max) {
        return Math.floor(Math.random(min) * Math.floor(max));
    }
    function initQuestion(element) {
        //выбрать случайный интервал
        var interval = getRandomInt(10, 20);
        //применить переключение
        var timerId = setInterval(function() {
            element.classList.toggle('js-question--visible');
        }, interval * 1000);
    }
    var questions = document.querySelectorAll('.js-question');
    if (questions.length > 0) {
        questions.forEach(function (question) {
            initQuestion(question);
        });
    }

    var randomPages = document.querySelectorAll('.js-random-page');
    randomPages.forEach((randomPage) => {
        var number = getRandomInt(0, 32);
        randomPage.textContent = number.toString().length > 1 ? number : '0' + number;
    });
});
