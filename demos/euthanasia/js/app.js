(function() {
    var body = document.querySelector("body");
    // if (body.offsetWidth >= 1260) {
    var homeHeader = document.querySelector(".roadmap-header");
    homeHeader.classList.add("roadmap-header--parallax");
    var parallaxHeader = document.querySelector("#parallax-header");
    var parallaxHeaderInstance = new Parallax(parallaxHeader);
    // }

    var controller = new ScrollMagic.Controller();

    // build scene
    var progressContainer = document.querySelector(".js-progress-container");
    var test = document.querySelector("#roadmap-step-1");
    var progressBar = document.querySelector(".js-progress-bar");
    var progressScene = new ScrollMagic.Scene({triggerElement: "#roadmap", duration: progressContainer.offsetHeight})
        .addTo(controller)
        // .addIndicators() // add indicators (requires plugin)
        .on("update", function (e) {
            // $("#scrollDirection").text(e.target.controller().info("scrollDirection"));
        })
        .on("enter", function (e) {
            // $("#roadmap-step-1").text(e.type == "enter" ? "inside" : "outside");
        })
        .on("start end", function (e) {
            // $("#lastHit").text(e.type == "start" ? "top" : "bottom");
        })
        .on("progress", function (e) {
            var newHeight = progressContainer.offsetHeight * e.progress.toFixed(3);
            if (newHeight > progressBar.offsetHeight) {
                progressBar.style.height = newHeight + "px";
            }
            $("#progress").text(e.progress.toFixed(3));
        });

    var initStep = function(number) {
        new ScrollMagic.Scene({triggerElement: "#roadmap-step-" + number})
            // .addIndicators() // add indicators (requires plugin)
            .addTo(controller)
            .on("enter", function (e) {
                $("#roadmap-step-" + number).addClass("roadmap-step--active");
                // $("#roadmap-step-" + number + " .js-step-preview").addClass("js-step-preview-active");
            })
            .reverse(false);
    }

    var initCheckpoint = function(step, number) {
        var stepDateElement = step.querySelector(".js-step-date");
        if (stepDateElement) {
            // var checkpoint = document.querySelector(".js-checkpoint-" + number);
            var checkpoint = document.createElement("div");
            checkpoint.classList.add("roadmap-line__progress-checkpoint");
            checkpoint.classList.add("visually-hidden");
            checkpoint.classList.add("js-checkpoint-" + number);
            progressBar.appendChild(checkpoint);
            var checkpointPosition = stepDateElement.offsetTop;
            var checkpointPositionAdjusted = checkpointPosition + stepDateElement.clientHeight / 2 - 10;
            checkpoint.style.top = checkpointPositionAdjusted + "px";

            progressScene.on("progress", function (e) {
                var progress = progressContainer.offsetHeight * e.progress.toFixed(3);
                if (progress >= checkpointPositionAdjusted) {

                    checkpoint.classList.remove("visually-hidden");
                    checkpoint.classList.add("scale-in-center");
                    setTimeout(
                        function() {
                            initStep(number);
                        }, 200);
                }
            })
        } else {
            console.error("Check js-step-date");
        }

    }

    var steps = document.querySelectorAll(".roadmap-step");
    steps.forEach(function(step, i) {
        initCheckpoint(step, i + 1);
        // initStep(i + 1);
    });
}());

(function() {
    var paymentVars = document.querySelectorAll('.js-payment-var');
    var priceEl = document.querySelector('.js-price');
    paymentVars.forEach(function(paymentVar, i) {
        paymentVar.addEventListener('click', function() {
            priceEl.innerHTML = paymentVar.dataset.price;
            paymentVars.forEach(function(paymentVar) {
                paymentVar.classList.remove('js-payment-var-active');
            });
            paymentVar.classList.add('js-payment-var-active');
        });
    });

    var codeInputTrigger = document.querySelector('.js-open-code');
    var codeBlock = document.querySelector('.js-code-block');
    var codeInput = document.querySelector('.js-code-input');
    var codeSubmit = document.querySelector('.js-submit-code');
    codeInputTrigger.addEventListener('click', function() {
        codeBlock.classList.remove('display-hidden');
    });
    var initCode = function() {
        var code = codeInput.value;
        if (code === 'партакиада') {
            priceEl.innerHTML = '365';
        } else if (code.toString().slice(-1) === '!') {
            var customPrice = code.substring(0, code.length - 1);
            if (+customPrice > 365) {
                priceEl.innerHTML = customPrice;
            }
        }
    }
    codeSubmit.addEventListener('click', initCode);
    codeInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            initCode();
        }
    });
}());
