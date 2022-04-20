import Cookies from "universal-cookie";

const cookies = new Cookies();

const setMyCookie = (name, value) => {
  cookies.set(name, value);
};

const getMyCookie = (name) => {
  return cookies.get(name);
};

const cookieService = {
  setCookie: setMyCookie,
  getCookie: getMyCookie,
};

export { cookieService };
