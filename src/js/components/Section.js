export default class Section {
  constructor(props) {
    this.section = props.section;
    this.classOpened = props.classOpened;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.section.classList.add(this.classOpened);
  }

  close() {
    this.section.classList.remove(this.classOpened);
  }
}
