import config from '../config/setting';
import moment, { Moment } from 'moment';

const fbImageType = 'normal';
function getFacebookAvatar(fbId: string) {
  return `http://graph.facebook.com/${fbId}/picture?type=${fbImageType}`;
}

function getAvatarOfUser({ avatar, fb_id }: { avatar: string; fb_id: string }) {
  if (avatar) {
    if (!avatar.includes('http')) {
      avatar = config.IMAGE_HOST + '/' + avatar;
    }
    return avatar;
  } else if (fb_id) {
    return getFacebookAvatar(fb_id);
  }

  return avatar;
}

function shuffle(array: any[]) {
  if (!array) {
    return [];
  }
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const convertTimeRemainToString = (timeRemain: number, format: string) => {
  const miliSecondsPerHour = 60 * 60 * 1000;
  const miliSecondsPerDay = miliSecondsPerHour * 24;
  const times = new Date(timeRemain).getTime();
  const day = Math.floor(times / miliSecondsPerDay);
  const hour = Math.floor((times % miliSecondsPerDay) / miliSecondsPerHour);
  const min = Math.floor((times % miliSecondsPerHour) / 60000);
  return format
    .replace('DD', day.toString())
    .replace('dd', day.toString())
    .replace('HH', hour.toString())
    .replace('hh', hour.toString())
    .replace('MM', min.toString())
    .replace('mm', min.toString());
};

const convertTimeToString = (time: any, format: string) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const mon = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const min = ('0' + date.getMinutes()).slice(-2);
  const second = ('0' + date.getSeconds()).slice(-2);

  return format
    .replace('YYYY', year.toString())
    .replace('yyyy', year.toString())
    .replace('dd', day.toString())
    .replace('DD', day.toString())
    .replace('MM', mon.toString())
    .replace('hh', hour.toString())
    .replace('mm', min.toString())
    .replace('ss', second.toString());
};

const upperCaseFirstLetter = (string: string) => {
  if (!string || string.length === 0) {
    return string;
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

function getHumanReadableNumber(number: number, fixed = 2) {
  if (!number) {
    return 0;
  }
  const postfix = ['K', 'M', 'B', 'T'];
  const arrange = [1000, 1000000, 1000000000, 1000000000000];
  let numberString = '';
  for (let i = arrange.length - 1; i >= 0; i--) {
    if (number > arrange[i]) {
      numberString = (number / arrange[i]).toFixed(fixed) + postfix[i];
      break;
    }
  }

  return numberString;
}

function numberWithCommas(x: number) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function vndFormat(x: number) {
  if (typeof x !== 'number') {
    x = parseInt(x);
  }
  if (x) {
    return x.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  return x;
}

function getImageUrl(path: any) {
  if (!path) {
    return path;
  }

  if (path.includes('base64')) {
    return path;
  }

  if (path.includes(config.IMAGE_HOST) || path.includes('http://') || path.includes('https://')) {
    return path;
  }

  return config.IMAGE_HOST + '/' + path;
}

function rawGetImageUrl(path: any, width: number, notMultiSize = false) {
  if (!path) {
    return path;
  }
  if (path.includes('base64')) {
    return path;
  }

  if (path.includes(config.IMAGE_HOST) || path.includes('http://') || path.includes('https://')) {
    return path;
  }
  if (notMultiSize) {
    let suffix = path;
    if (!path.includes('.png') && !path.includes('jpg')) {
      suffix = path + '.png';
    }

    if (path.includes('.jpeg')) {
      suffix = path;
    }
    return config.IMAGE_HOST + '/' + suffix;
  }

  return config.IMAGE_HOST + '/' + path + `-${width}.jpg`;
}

interface PaginationWithTime {
  pageSize: number;
  currentPage: number;
  startTime: string;
  endTime: string;
  startWith: 'endTime' | 'startTime';
}

function getPeriodTimeByPagination(data: PaginationWithTime) {
  const { startTime, endTime, pageSize, currentPage, startWith } = data;
  let start_time: string;
  let end_time: string;
  if (startWith === 'startTime') {
    start_time = moment(startTime)
      .add(pageSize * (currentPage - 1), 'days')
      .format('YYYY-MM-DD');
    end_time = moment(start_time).add(pageSize, 'days').format('YYYY-MM-DD');
    end_time = new Date(end_time) > new Date(endTime) ? endTime : end_time;
  } else {
    end_time = moment(endTime)
      .subtract(pageSize * (currentPage - 1), 'days')
      .format('YYYY-MM-DD');
    start_time = moment(end_time).subtract(pageSize, 'days').format('YYYY-MM-DD');
    start_time = new Date(start_time) < new Date(startTime) ? startTime : start_time;
  }
  return { start_time, end_time };
}

interface RawPaginationWithTime {
  pageSize: number;
  currentPage: number;
  startTime: Moment;
  endTime: Moment;
  startWith: 'endTime' | 'startTime';
}

const rawGetPeriodTimeByPagination = (query: RawPaginationWithTime) => {
  const { startTime, endTime, pageSize, currentPage, startWith } = query;
  let start_time: Moment;
  let end_time: Moment;
  if (startWith === 'startTime') {
    start_time = moment(startTime).add(pageSize * (currentPage - 1), 'days');
    end_time = moment(start_time).add(pageSize, 'days');
    end_time = end_time.valueOf() > endTime.valueOf() ? endTime : end_time;
  } else {
    end_time = moment(endTime).subtract(pageSize * (currentPage - 1), 'days');
    start_time = moment(end_time).subtract(pageSize, 'days');
    start_time = start_time.valueOf() < startTime.valueOf() ? startTime : start_time;
  }
  return { start_time, end_time };
};

function getPromotionsStatusByDate(start_at: string | Date, expire_at: string | Date) {
  const currentDate = new Date().getTime();
  const startDate = new Date(start_at).getTime();
  const endDate = new Date(expire_at).getTime();
  if (currentDate < startDate) {
    return 'waiting';
  } else if (currentDate > endDate) {
    return 'overed';
  }
  return 'running';
}

function formatPhoneNumber(phoneNumber: string) {
  if (phoneNumber && phoneNumber.indexOf('+84') >= 0) {
    return phoneNumber.replace('+84', '0');
  }
  return phoneNumber;
}

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function hexToRGB(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

function detectFileUrl(path: string, isCategory = false) {
  if (config.BACKEND_HOST && path.includes(config.BACKEND_HOST)) {
    path = path.replace(config.BACKEND_HOST, '');
  }
  if (path.indexOf('/') === 0) {
    path = path.substring(1, path.length);
  }
  if (isCategory) {
    return path;
  }

  const lastIndexOfMinus = path.lastIndexOf('-');
  if (lastIndexOfMinus >= 0) {
    path = path.slice(0, path.lastIndexOf('-'));
  }
  return path;
}

function roundNumber(value: number, numberOfRounding: number) {
  if (!value) return 0;
  // const number = parseInt(numberOfRounding);

  const denom = Math.pow(10, numberOfRounding);
  const result = Math.round(value * denom) / denom;
  return result;
}

function handleNumberInput(value: string) {
  if (!value) {
    return 0;
  }
  if (isNaN(parseInt(value))) {
    return null;
  }
  let numberHandled = 0;
  if (value) {
    value = value.replace(/\./gi, '');
    numberHandled = parseInt(value);
  }
  if (numberHandled < 0) {
    return null;
  }

  return numberHandled;
}

function getBannerStatus(
  status: string,
  start_time: moment.MomentInput,
  end_time: moment.MomentInput
) {
  const current = moment();
  const start = moment(start_time);
  const end = moment(end_time);
  let flag = '';
  if (current < start) {
    flag = 'upcoming';
  } else if (
    (status === 'pending' && start < current) ||
    (status === 'approved' && end < current)
  ) {
    flag = 'expired';
  } else {
    flag = 'running';
  }
  return { finalStatus: status === 'approved' ? flag : status, flag };
}
export const toUpperCaseFirstLetter = (text: string): string => {
  if (!text || text.length == 0) {
    return text;
  }

  return text.slice(0, 1).toUpperCase() + text.slice(1);
};

export default {
  getFacebookAvatar,
  getHumanReadableNumber,
  shuffle,
  upperCaseFirstLetter,
  getAvatarOfUser,
  convertTimeToString,
  convertTimeRemainToString,
  getImageUrl,
  numberWithCommas,
  vndFormat,
  getPeriodTimeByPagination,
  rawGetPeriodTimeByPagination,
  getPromotionsStatusByDate,
  formatPhoneNumber,
  getBase64,
  hexToRGB,
  rawGetImageUrl,
  detectFileUrl,
  roundNumber,
  handleNumberInput,
  getBannerStatus,
  toUpperCaseFirstLetter
};
