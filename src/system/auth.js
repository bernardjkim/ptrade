import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getCookie(name) {
    return cookies.get(name);
}

export function setCookie(name, val) {
    return cookies.set(name, val, { maxAge: 300});
}

export function removeCookie(name) {
    return cookies.remove(name);
}