export default class ElementsListeners {
  constructor(props) {
    this.props = props;
  }

  addListeners(props = this.props) {
    this.newProps = props;
    Object.keys(this.newProps).forEach((item) => {
      this.newProps[item].callBack = this.newProps[item].callBack.bind(this);
      this.newProps[item].element.addEventListener(
        this.newProps[item].event,
        this.newProps[item].callBack,
      );
    });
  }

  removeListeners(props = this.props) {
    this.newProps = props;
    Object.keys(this.newProps).forEach((item) => {
      this.newProps[item].element.removeEventListener(
        this.newProps[item].event,
        this.newProps[item].callBack,
      );
    });
  }
}
