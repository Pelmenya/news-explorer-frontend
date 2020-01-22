export default class ButtonsListeners {
  _addListeners() {
    Object.keys(this.props).forEach((item) => {
      this.props[item].callBack = this.props[item].callBack.bind(this);
      this.props[item].button.addEventListener(this.props[item].event, this.props[item].callBack);
    });
  }

  constructor(props) {
    this.props = props;
    this._addListeners();
  }

  addListeners(props) {
    this.newProps = props;
    Object.keys(props).forEach((item) => {
      this.newProps[item].callBack = this.newProps[item].callBack.bind(this);
      this.newProps[item].button.addEventListener(
        this.newProps[item].event,
        this.newProps[item].callBack,
      );
    });
  }
}
