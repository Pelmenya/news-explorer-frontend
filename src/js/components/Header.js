import ButtonsListeners from './ButtonsListeners';

export default class Header extends ButtonsListeners {

  constructor(props, profileOwner = null) {
    super(props);
    this._profileOwner = profileOwner;
  }

  render() {}
}
