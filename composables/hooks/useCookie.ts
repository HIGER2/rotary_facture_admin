// composables/useCookies.ts
import Cookies from 'js-cookie';
import type {CookieAttributes} from 'js-cookie';

export const useCookies = () => {
  const setCookie = (name: string, value: string, options: CookieAttributes = {}): void => {
    Cookies.set(name, value, options);
  };

  const getCookie = (name: string): string | undefined => {
    return Cookies.get(name);
  };

  const removeCookie = (name: string, options: CookieAttributes = {}): void => {
    Cookies.remove(name, options);
  };

  return {
    setCookie,
    getCookie,
    removeCookie
  };
};
