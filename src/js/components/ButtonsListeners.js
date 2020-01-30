export default class ButtonsListeners {
  constructor(props) {
    this.props = props;
    this.addListeners();
  }

  addListeners(props = this.props) {
    this.newProps = props;
    Object.keys(this.newProps).forEach((item) => {
      this.newProps[item].callBack = this.newProps[item].callBack.bind(this);
      this.newProps[item].button.addEventListener(
        this.newProps[item].event,
        this.newProps[item].callBack,
      );
    });
  }

  removeListeners(props = this.props) {
    this.newProps = props;
    Object.keys(this.newProps).forEach((item) => {
      this.newProps[item].button.removeEventListener(
        this.newProps[item].event,
        this.newProps[item].callBack,
      );
    });
  }
}
