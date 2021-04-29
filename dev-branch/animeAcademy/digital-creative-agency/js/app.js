(function() {
  var sidebar = document.querySelector("#sidebar");
  var sidebarToggle = document.querySelector("#sidebar-toggle");
  var toggleSidebar = function(e) {
    e.preventDefault();
    if (sidebar.classList.contains("js-open")) {
      sidebar.classList.remove("js-open");
      sidebarToggle.classList.remove("js-open");
    } else {
      sidebar.classList.add("js-open");
      sidebarToggle.classList.add("js-open");
    }
  };
  sidebarToggle.addEventListener('click', toggleSidebar);
}());

(function() {
  $(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });
}());

(function() {
  var controller = new ScrollMagic.Controller();
  //установить максимальную высоту для .js-progress-bar
  //установить bottom для .js-progress-container

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
        // $("#roadmap-step-" + number).addClass("tilt-in-bottom-1");
      })
      .reverse(false);
  }

  var initCheckpoint = function(step, number, isLast) {
    var stepDateElement = step.querySelector(".js-step-date");
    if (stepDateElement) {
      // var checkpoint = document.querySelector(".js-checkpoint-" + number);
      var checkpoint = document.createElement("div");
      checkpoint.classList.add("roadmap-line__progress-checkpoint");
      checkpoint.classList.add("visually-hidden");
      checkpoint.classList.add("js-checkpoint-" + number);
      checkpoint.innerHTML = '<svg class="svg svg--shadow-accent roadmap-line__checkpoint-img" width="100" height="100"><use xlink:href="#icon-checkpoint"></use></svg>';
      progressBar.appendChild(checkpoint);
      var checkpointPosition = stepDateElement.offsetTop;
      var checkpointPositionAdjusted = checkpointPosition + stepDateElement.clientHeight / 2 - 10;
      checkpoint.style.top = checkpointPositionAdjusted + "px";

      progressScene.on("progress", function (e) {
        var progress = progressContainer.offsetHeight * e.progress.toFixed(3);
        if (progress >= checkpointPositionAdjusted) {

          checkpoint.classList.remove("visually-hidden");
          checkpoint.classList.add("scale-in-center");
          checkpoint.classList.add("svg--fill-accent");
          setTimeout(
            function() {
              initStep(number);
            }, 200);
        }
      })
      if (isLast) {
        console.log('hello, im last checkpoint. my position is ' + checkpointPositionAdjusted);
        progressBar.style.maxHeight = checkpointPositionAdjusted + 'px';
        progressContainer.style.paddingBottom = progressContainer.offsetHeight - checkpointPositionAdjusted + 'px';
      }
    } else {
      console.error("Check js-step-date");
    }

  }

  var steps = document.querySelectorAll(".roadmap-step");
  steps.forEach(function(step, i) {
    var isLast = steps.length === i + 1;
      initCheckpoint(step, i + 1, isLast);
  });
}());
