import { profileOwner } from '../../constants/constants';
import {
  headerAuthDesktopBtn,
  headerAuthMobilBtn,
  headerLogoutDesktopBtn,
  headerLogoutMobilBtn,
  headerLogoutBtnCaptionDesktop,
  headerLogoutBtnCaptionMobil,
  headerChangeHeadLink,
  headerChangeSaveLink,
  headerSaveMobilLink,
} from '../../constants/objects/elements';
import { getProfile, removeProfile } from '../functions';

/** CallBack отображения хёдера. Cтраница пользователя */
function renderLoginHeaderArticles() {
  headerLogoutDesktopBtn.open();
  headerLogoutMobilBtn.open();
  headerLogoutBtnCaptionDesktop.textContent = getProfile(profileOwner).user.name;
  headerLogoutBtnCaptionMobil.textContent = getProfile(profileOwner).user.name;
}

/** CallBack отображения хёдера, если пользователь залогинен. Главная страница */
function renderLoginHeader() {
  renderLoginHeaderArticles();
  headerChangeSaveLink.open();
  headerSaveMobilLink.open();
  headerAuthMobilBtn.close();
  headerAuthDesktopBtn.close();
}

/** CallBack отображения хёдера. Cтраница пользователя */
function renderNotLoginHeaderArticles() {
  headerLogoutDesktopBtn.close();
  headerLogoutMobilBtn.close();
  headerChangeHeadLink.open();
}

/** CallBack отображения хёдера, если пользователь не залогинен. Главная страница */
function renderNotLoginHeader() {
  renderNotLoginHeaderArticles();
  headerChangeSaveLink.close();
  headerSaveMobilLink.close();
  headerAuthMobilBtn.open();
  headerAuthDesktopBtn.open();
}

/** CallBack выхода из авторизованного режима хёдера */
function logoutHandlerClick() {
  removeProfile(profileOwner);
  window.location.href = 'index.html';
}

export {
  renderLoginHeader,
  renderLoginHeaderArticles,
  renderNotLoginHeader,
  renderNotLoginHeaderArticles,
  logoutHandlerClick,
};
