(function () {
    const swiper = new Swiper('.swiper-default', {
        // Optional parameters
        autoplay: {
            delay: 5000,
        },
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
}());

(function () {
    const swiper = new Swiper('.swiper-banner', {
        loop: true,
    });
}());

(function () {
    const swiper = new Swiper('.swiper-macro', {
        // Optional parameters
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },
    });
}());