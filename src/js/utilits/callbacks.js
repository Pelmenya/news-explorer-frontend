import { profileOwner } from '../constants/constants';

// Функции
import { removeProfile } from './functions';

// CallBacks
function logoutHandlerClick() {
  removeProfile(profileOwner);
  window.location.href = 'index.html';
}

export default logoutHandlerClick;
