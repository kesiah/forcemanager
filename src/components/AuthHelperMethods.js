import decode from 'jwt-decode';

export default class AuthHelperMethods {
  getTokenByKeys = (publicKey, privateKey) => {
    // Get a token from api server using the fetch api
    return this.fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: publicKey,
        password: privateKey,
      }),
    }).then((res) => {
      this.setToken(res.token);
      return Promise.resolve(res);
    });
  };

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    console.log("[AuthHelperMethods] logged in > ", token, (!!token && !this.isTokenExpired(token)));
    return !!token && !this.isTokenExpired(token);
  };

  isTokenExpired = (token) => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired.
        return true;
      }

      return false;
    } catch (err) {
      console.log('[AuthService.js] expired check failed!');
      return false;
    }
  };

  setToken = idToken => (
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  );

  getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  };

  logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  };

  getConfirm = () => {
    // Using jwt-decode npm package to decode the token
    const answer = decode(this.getToken());
    return answer;
  };

  fetch = (url, options) => {
    const serverUrl = `https://apipre.forcemanager.net/api/v4${url}`;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // Setting X-Session-Key header
    if (this.loggedIn()) {
      headers['X-Session-Key'] = `${this.getToken()}`;
    }

    return fetch(serverUrl, {
      headers,
      ...options,
    })
      .then(this.checkStatus)
      .then(response => response.json());
  };

  checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  };
}
