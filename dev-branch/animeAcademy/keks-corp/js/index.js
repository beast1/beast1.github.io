(function() {
    var toggleMenuBtns = document.querySelectorAll('.js-toggle-menu');
    var menu = document.querySelector('.js-menu');
    var toggleMenu = function (evt) {
        menu.classList.toggle('js-menu-open');
    };
    var closeMenu = function (evt) {
        menu.classList.remove('js-menu-open');
    };
    var openMenu = function (evt) {
        menu.classList.add('js-menu-open');
    };
    var onScrollDirect = function(onScrollDown, onScrollUp) {
        var lastScrollTop = 0;
        document.addEventListener('scroll', function (evt) {
            var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st > lastScrollTop) {
                console.log('scroll down');
                onScrollDown();
            } else {
                console.log('scroll up');
                onScrollUp();
            }
            lastScrollTop = st <= 0 ? 0 : st;
        });
    }
    toggleMenuBtns.forEach(function(openMenuBtn) {
        openMenuBtn.addEventListener('click', toggleMenu);
    });
    onScrollDirect(closeMenu, openMenu);
}());
(function() {
    var page = document.querySelector('.page');
    var progressBar = document.querySelector('#progress');
    var progressTarget = document.querySelector('#progress-target');

    document.addEventListener('scroll', function (evt) {
        var pageStep = page.clientHeight / 100;
        var progressBarStep = progressBar.offsetHeight / 100;
        var pageScrollFromTop = document.documentElement.scrollTop;
        var progressPercent = pageScrollFromTop / pageStep;
        var progressValue = progressPercent * progressBarStep;
        progressTarget.style.transform = 'translateY(' + progressValue + 'px)';
    });
}());
(function() {
    $('.js-open-contacts').magnificPopup({
        type:'inline',
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
}());
(function() {
    var marqueeElement = document.querySelector('.js-marquee');
    var repeatedElement = document.querySelector('.js-repeated-element');
    for (var i = 0; i < 35; i++) {
        marqueeElement.appendChild(repeatedElement.cloneNode(true));
    }
    // repeatedElement.cl
//     var timerId = setInterval(function() {
//         $('.js-infinite-line').append('<span>UM-BRELLA CORP</span>');
//         $('.js-infinite-line span:first-child').remove();
//     }, 8000);
//
//     var controller = new ScrollMagic.Controller();
//
//     // build tween
//     var tween = TweenMax.to("#target", 1, {rotation: 360, ease: Linear.easeNone});
//
//     // build scene
//     var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: 300})
//         .setTween(tween)
//         .setPin("#target", {pushFollowers: false})
//         .addIndicators() // add indicators (requires plugin)
//         .addTo(controller);
}());
(function() {
    var controller = new ScrollMagic.Controller();
    var firstTitleAnimation = new ScrollMagic.Scene({triggerElement: ".js-title-1-trigger"})
        .setClassToggle(".js-title-1", "slide-in-br") // add class toggle
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
        .reverse(false);
    firstTitleAnimation.offset(-200);
    var secondTitleAnimation = new ScrollMagic.Scene({triggerElement: ".js-title-2-trigger"})
        .setClassToggle(".js-title-2", "slide-in-bl") // add class toggle
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
        .reverse(false);
    secondTitleAnimation.offset(-200);
    var thirdTitleAnimation = new ScrollMagic.Scene({triggerElement: ".js-title-3-trigger"})
        .setClassToggle(".js-title-3", "slide-in-br") // add class toggle
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
        .reverse(false);
    thirdTitleAnimation.offset(-200);
    var listItems = document.querySelectorAll('.js-list-item');
    listItems.forEach(function (item, i) {
        var orderClass = 'js-list-item' + '-' + i;
        item.classList.add(orderClass);
        var singleItem = document.querySelector(orderClass);
        var animation = new ScrollMagic.Scene({triggerElement: '.' + orderClass})
            .setClassToggle('.' + orderClass, "slide-in-left") // add class toggle
            // .addIndicators() // add indicators (requires plugin)
            .addTo(controller)
            .reverse(false);
        var animationOffset = 100 + listItems.length - i * 10;
        animation.offset(-animationOffset);
    });
    // var listAnimation = new ScrollMagic.Scene({triggerElement: ".js-list-item"})
    //     .setClassToggle(".js-list-item", "slide-in-left") // add class toggle
    //     .addIndicators() // add indicators (requires plugin)
    //     .addTo(controller);
    // listAnimation.offset(-200);
}());
(function() {
    function printText(selector) {
        var el = document.querySelector(selector);
        var letterTimeout = 20;
        var text = el.innerHTML;
        var i = 1;
        el.classList.add('js-printed-text--run');
        var printSymbol = function() {
            if (i <= text.length) {
                el.innerHTML = text.substr(0, i);
                setTimeout(arguments.callee, letterTimeout);
            }
            i++;
        }
        printSymbol();
    }

    var controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({triggerElement: "#about-us"})
        .addTo(controller)
        .on("enter", function (e) {
            printText('#printed-text-2');
        })
        .reverse(false);

    new ScrollMagic.Scene({triggerElement: "#intro"})
        .addTo(controller)
        .on("enter", function (e) {
            printText('#printed-text-3');
        })
        .reverse(false)

    printText('#printed-text-1');
}());
