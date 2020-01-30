export default class Element {
  constructor(props) {
    this.element = props.element;
    this.classOpened = props.classOpened;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.element.classList.add(this.classOpened);
  }

  close() {
    this.element.classList.remove(this.classOpened);
  }
}
