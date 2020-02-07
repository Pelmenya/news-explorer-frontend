import SeachAction from '../../js/components/SeachAction';

export default class PopUp extends SeachAction {
  constructor(props) {
    super(props);
    this.closeClick = this.closeClick.bind(this);
    this.closeKeyDown = this.closeKeyDown.bind(this);
  }

  addEventsListeners() {
    this.container.addEventListener('click', this.closeClick);
    window.addEventListener('keydown', this.closeKeyDown);
  }

  removeEventsListeners() {
    this.container.removeEventListener('click', this.closeClick);
    window.removeEventListener('keydown', this.closeKeyDown);
  }

  closeClick(event) {
    if (event.target.classList.value === this.container.classList.value) {
      this.removeEventsListeners();
      this.close();
    }
  }

  closeKeyDown(event) {
    if (event.key === 'Escape') {
      this.removeEventsListeners();
      this.close();
    }
  }
}
