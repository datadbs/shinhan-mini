const SERVER_URL = 'http://127.0.0.1:8000'

async function register(user) {
  let response = await fetch(`${SERVER_URL}/user/register`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 백엔드에서 set-cookie 를 허용
  });
  let data = await response.json();
  return data;
}

async function login(user) {
  let response = await fetch(`${SERVER_URL}/user/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 백엔드에서 set-cookie 를 허용
  });
  let data = await response.json();
  return data;
}

async function submitRegister() {
    let user = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      fullname: document.getElementById('fullname').value,
    }
    let result = await register(user);
    console.log(result);
  }

  //#####COOKIE#####
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  function setCookie(name, value) {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/";
    document.cookie = updatedCookie;
  }
  //##############
  async function submitLogin() {
    let user = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    }
    let result = await login(user);
    if (result.access_token) {
        setCookie('access_token', result.access_token);
    }
  }