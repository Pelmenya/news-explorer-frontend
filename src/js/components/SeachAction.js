
export default class SeachAction {
  _setContent() {
    this.container
      .querySelector(`.${this.container.classList[0]}__content`)
      .appendChild(this.content);
  }

  _clearContent() {
    this.container
      .querySelector(`.${this.container.classList[0]}__${this.nameNode}`)
      .parentNode.removeChild(
        this.container.querySelector(`.${this.container.classList[0]}__${this.nameNode}`),
      );
  }

  constructor(props) {
    this.isFull = false; // пустой контейнер
    this.container = props.container;
    this.classOpened = props.classOpened;
    // элементы, которые не должны быть видны при открытии контейнера
    if (props.element) this.element = props.element;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._setContent = this._setContent.bind(this);
    this._clearContent = this._clearContent.bind(this);
  }

  open(content, nameNode) {
    if (this.element) this.element.close();
    this.content = content;
    this.nameNode = nameNode;
    this._setContent();
    this.container.classList.add(this.classOpened);
    this.isFull = true;
  }

  close() {
    if (this.element) this.element.open();
    this._clearContent();
    this.container.classList.remove(this.classOpened);
    this.isFull = false;
  }
}
