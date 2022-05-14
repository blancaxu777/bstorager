import Crypto, { AES } from 'crypto-js';
const KEY = 'BLANCABLANCA';
const timeTransformation = (time) => {
  if (time.length < 1) return 24 * 60 * 60 * 1000;
  const tt = time.substr(0, time.length - 1);
  if (!Number(tt)) return 24 * 60 * 60 * 1000;
  if (time.endsWith('s')) {
    return tt * 1000;
  } else if (time.endsWith('m')) {
    return tt * 60 * 1000;
  } else if (time.endsWith('h')) {
    return tt * 60 * 60 * 1000;
  } else if (time.endsWith('d')) {
    return tt * 24 * 60 * 60 * 1000;
  } else if (time.endsWith('M')) {
    return tt * 30 * 24 * 60 * 60 * 1000;
  } else if (time.endsWith('y')) {
    return tt * 365 * 24 * 60 * 60 * 1000;
  } else {
    return 24 * 60 * 60 * 1000;
  }
};
const save = (key, value, time = '1d') => {
  if (!key || !value) {
    console.warn('bstorager: Please enter the parameters key and value!');
    return;
  }
  if (window.localStorage) {
    const tolValue = {
      expireTime: Date.now() + timeTransformation(time),
      value,
    };
    localStorage.setItem(
      'bs_' + key,
      AES.encrypt(JSON.stringify(tolValue), KEY)
    );
  } else {
    console.warn('bstorager: Not supported at the moment!');
  }
};
const get = (key) => {
  if (!key) {
    console.warn('bstorager: Please enter the parameters key!');
    return;
  }
  if (window.localStorage) {
    const isExist = localStorage.getItem('bs_' + key);
    if (!isExist) return null;
    const tolValue = JSON.parse(
      AES.decrypt(isExist, KEY).toString(Crypto.enc.Utf8)
    );
    if (tolValue.expireTime < Date.now()) {
      window.localStorage.removeItem(key);
      return null;
    } else {
      return tolValue.value;
    }
  } else {
    console.warn('bstorager: Not supported at the moment!');
  }
};
const getExpire = (key) => {
  if (!key) {
    console.warn('bstorager: Please enter the parameters key!');
    return;
  }
  if (window.localStorage) {
    const isExist = localStorage.getItem('bs_' + key);
    if (!isExist) return null;
    const tolValue = JSON.parse(
      AES.decrypt(isExist, KEY).toString(Crypto.enc.Utf8)
    );
    if (tolValue.expireTime < Date.now()) {
      window.localStorage.removeItem(key);
      return null;
    } else {
      return tolValue.expireTime;
    }
  } else {
    console.warn('bstorager: Not supported at the moment!');
  }
};
const clear = () => {
  for (let key in localStorage) {
    if (key.startsWith('bs_')) {
      const tolValue = JSON.parse(
        AES.decrypt(localStorage.getItem(key), KEY).toString(Crypto.enc.Utf8)
      );
      if (tolValue.expireTime < Date.now()) {
        window.localStorage.removeItem(key);
        return null;
      }
    }
  }
};
export default {
  get,
  save,
  clear,
  getExpire,
};
