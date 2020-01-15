export default class ButtonsListeners {
  constructor(props) {
    this.props = props;
    this.addListeners();
  }

  addListeners() {
    Object.keys(this.props).forEach((item) => {
      this.props[item].callBack = this.props[item].callBack.bind(this);
      this.props[item].button.addEventListener(this.props[item].event, this.props[item].callBack);
    });
  }
}
