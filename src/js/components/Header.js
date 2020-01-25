import ButtonsListeners from './ButtonsListeners';

export default class Header extends ButtonsListeners {
  constructor(props, isLoggedIn, callBacks) {
    super(props);

    this.isLoggedIn = isLoggedIn;
    this._renderLoginHeader = callBacks.renderLoginHeader;
    this._renderNotLoginHeader = callBacks.renderNotLoginHeader;

    this.render = this.render.bind(this);

    this.render(this.isLoggedIn);
  }

  render(props) {
    if (props) {
      this.name = props.name;
      this.isLoggedIn = props.isLoggedIn;
      this._renderLoginHeader();
    } else this._renderNotLoginHeader();
  }
}
