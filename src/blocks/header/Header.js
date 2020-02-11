import ElementsListeners from '../../js/components/ElementsListeners';

export default class Header extends ElementsListeners {
  constructor(props, isLoggedIn) {
    super(props);
    this.isLoggedIn = isLoggedIn;
  }

  create(renderLoginHeader, renderNotLoginHeader) {
    this.addListeners();
    this.renderLoginHeader = renderLoginHeader;
    this.renderNotLoginHeader = renderNotLoginHeader;
    this.render(this.isLoggedIn);
  }

  render(props) {
    if (props) {
      this.name = props.name;
      this.isLoggedIn = props.isLoggedIn;
      this.renderLoginHeader();
    } else this.renderNotLoginHeader();
  }
}
