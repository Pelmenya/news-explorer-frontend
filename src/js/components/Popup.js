export default class Popup {
  constructor(popup, headerGamburgerLinesBtn) {
    this.popup = popup;
    this.headerGamburgerLinesBtn = headerGamburgerLinesBtn;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setContent = this.setContent.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  }

  setContent() {
    this.popup.querySelector('.popup__content').appendChild(this.content);
  }

  clearContent() {
    this.popup
      .querySelector(`.popup__${this.nameNode}`)
      .parentNode.removeChild(this.popup.querySelector(`.popup__${this.nameNode}`));
  }

  open(content, nameNode) {
    this.headerGamburgerLinesBtn.style.visibility = 'hidden';
    this.content = content;
    this.nameNode = nameNode;
    this.setContent();
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.headerGamburgerLinesBtn.style.visibility = 'visible';
    this.clearContent();
    this.popup.classList.remove('popup_is-opened');
  }
}
