(function() {
    var sidebarElement = document.querySelector("#sidebar");
    var sidebarToggle = document.querySelector("#sidebar-toggle");
    var sidebarCloseArr = document.querySelectorAll(".js-sidebar-close");
    sidebarToggle.addEventListener("click", function() {
        sidebarElement.classList.toggle("sidebar--slide-open");
    });
    sidebarCloseArr.forEach(function(sidebarClose) {
        sidebarClose.addEventListener("click", function() {
            sidebarElement.classList.remove("sidebar--slide-open");
        });
    });

    var bodyElement = document.querySelector("body");
    $(".js-open-request-access").magnificPopup({
        type:"inline",
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don"t provide alternative source in href.
        callbacks: {
            open: function() {
                bodyElement.style.overflow = "hidden";
            },
            close: function() {
                bodyElement.style.overflow = "unset";
            }
            // e.t.c.
        }
    });

    $(".js-open-login").magnificPopup({
        type:"inline",
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don"t provide alternative source in href.
        callbacks: {
            open: function() {
                bodyElement.style.overflow = "hidden";
            },
            close: function() {
                bodyElement.style.overflow = "unset";
            }
            // e.t.c.
        }
    });

    $(document).ready(function(){
        $(".js-anchor").on("click", function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $("html, body").animate({
                    scrollTop: $(hash).offset().top
                }, 800, function(){
                    window.location.hash = hash;
                });
            }
        });
    });
}());
