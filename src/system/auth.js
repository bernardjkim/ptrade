import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getCookie(name) {
    return cookies.get(name);
}

export function setCookie(name, val) {
    return cookies.set(name, val, { maxAge: 60 * 60}); // expires in 1 hour
}

export function removeCookie(name) {
    return cookies.remove(name);
}