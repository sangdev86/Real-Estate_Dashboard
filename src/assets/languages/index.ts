import { localStorageLanguage } from '../../config/storage';
import { eng, vie } from './import';

export let currentLang: any =
  localStorageLanguage.get() !== null ? localStorageLanguage.get() : 'vie';

export const setlan = (code: string) => {
  currentLang = localStorageLanguage.get() !== null ? localStorageLanguage.get() : 'vie';
  switch (code) {
    case 'vie':
      currentLang = vie;
      localStorageLanguage.set('vie');
      break;
    case 'eng':
      currentLang = eng;
      localStorageLanguage.set('eng');
      break;
    default:
      currentLang = vie;
      localStorageLanguage.set('vie');
  }
};
export const getLan = () => {
  currentLang = localStorageLanguage.get() !== null ? localStorageLanguage.get() : 'vie';
  switch (currentLang) {
    case 'vie':
      return vie;
    case 'eng':
      return eng;
    default:
      return vie;
  }
};
