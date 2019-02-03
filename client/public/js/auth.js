window.addEventListener('load', function() {

    var config = JSON.parse(
      decodeURIComponent(escape(window.atob('@@config@@')))
    );

    var params = Object.assign({
      domain: config.auth0Domain,
      clientID: config.clientID,
      redirectUri: config.callbackURL,
      responseType: 'code'
    }, config.internalOptions);

    var webAuth = new auth0.WebAuth(params);

    var databaseConnection = 'Username-Password-Authentication';

    function login(e) {
      e.preventDefault();
      var username = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      webAuth.redirect.loginWithCredentials({
        connection: databaseConnection,
        username: username,
        password: password
      }, function(err) {
        if (err) displayError(err);
      });
    }

    function signup() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;

      webAuth.redirect.signupAndLogin({
        connection: databaseConnection,
        email: email,
        password: password
      }, function(err) {
        if (err) displayError(err);
      });
    }

    function loginWithGoogle() {
      webAuth.authorize({
        connection: 'google-oauth2'
      }, function(err) {
        if (err) displayError(err);
      });
    }

    function displayError(err) {
      var errorMessage = document.getElementById('error-message');
      errorMessage.innerHTML = err.description;
      errorMessage.style.display = 'block';
    }

    document.getElementById('btn-login').addEventListener('click', login);
    document.getElementById('btn-google').addEventListener('click', loginWithGoogle);
    document.getElementById('btn-signup').addEventListener('click', signup);
  });