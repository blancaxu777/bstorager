import { encode, decode } from "js-base64";
const timeTransformation = (time) => {
  if (time.length < 1) return 24 * 60 * 60 * 1000;
  const tt = time.substr(0, time.length - 1);
  if (!Number(tt)) return 24 * 60 * 60 * 1000;
  if (time.endsWith("s")) {
    return tt * 1000;
  } else if (time.endsWith("m")) {
    return tt * 60 * 1000;
  } else if (time.endsWith("h")) {
    return tt * 60 * 60 * 1000;
  } else if (time.endsWith("d")) {
    return tt * 24 * 60 * 60 * 1000;
  } else if (time.endsWith("M")) {
    return tt * 30 * 24 * 60 * 60 * 1000;
  } else if (time.endsWith("y")) {
    return tt * 365 * 24 * 60 * 60 * 1000;
  } else {
    return 24 * 60 * 60 * 1000;
  }
};
const save = (key, value, time = "1d") => {
  if (!key || !value) {
    console.warn("bstorager: Please enter the parameters key and value!");
    return;
  }
  if (window.localStorage) {
    const now = new Date();
    const tolValue = {
      expireTime: now.getTime() + timeTransformation(time),
      value,
    };
    localStorage.setItem(encode(key), encode(encode(JSON.stringify(tolValue))));
  } else {
    console.warn("bstorager: Not supported at the moment!");
  }
};
const get = (key) => {
  if (!key) {
    console.warn("bstorager: Please enter the parameters key!");
    return;
  }
  if (window.localStorage) {
    const tolKey = encode(key);
    const isExist = localStorage.getItem(tolKey);
    if (!isExist) return null;
    const now = new Date();
    const tolValue = JSON.parse(decode(decode(isExist)));
    if (tolValue.expireTime < now.getTime()) {
      window.localStorage.removeItem(tolKey);
      return null;
    } else {
      return tolValue.value;
    }
  } else {
    console.warn("bstorager: Not supported at the moment!");
  }
};
const getExpire = (key) => {
  if (!key) {
    console.warn("bstorager: Please enter the parameters key!");
    return;
  }
  if (window.localStorage) {
    const tolKey = encode(key);
    const isExist = localStorage.getItem(tolKey);
    if (!isExist) return null;
    const tolValue = JSON.parse(decode(decode(isExist)));
    return tolValue.expireTime
  } else {
    console.warn("bstorager: Not supported at the moment!");
  }
}
export default {
  save,
  get,
  getExpire,
};
