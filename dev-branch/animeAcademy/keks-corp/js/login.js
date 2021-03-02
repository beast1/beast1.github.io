(function() {
    var loginSetup = document.querySelector('#login-setup');
    var errorMessage = document.querySelector('#login-error');
    loginSetup.addEventListener('click', function(e) {
        e.preventDefault();
        errorMessage.classList.add('visible');
    });
}());
