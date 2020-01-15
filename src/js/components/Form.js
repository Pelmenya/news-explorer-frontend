import ButtonsListeners from './ButtonsListeners';

export default class Form extends ButtonsListeners {
  constructor(props = [], popup, handlerSubmit) {
    super(props);
    // текст ошибок в input
    this.popup = popup;
    this.handlerSubmit = handlerSubmit;
    this.ERROR_TEXT = 'Должно быть от 2 до 30 символов';
    this.ERROR_EMAIL = 'Неправильный формат email';
    this.ERROR_PASSWORD = 'Неправильный пароль. Должен быть не меньше 6 символов';

    // форма попапа

    this.popupForm = this.popup.querySelector('.popup__form');

    this.inputs = this.popupForm.querySelectorAll('.popup__input');

    this.handlerInputForm = this.handlerInputForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handlerEntryInput = this.handlerEntryInput.bind(this);

    this.popupForm.addEventListener('input', this.handlerInputForm);
    this.popupForm.addEventListener('submit', this.submitForm);

    this.formReset();
    this.initializingInputsListeners();
    // Делаем при нажатии кнопки формы
    // this.handlerSubmit = handlerSubmit;*/
  }
  // методы

  // Добавление слушателей для inputs

  initializingInputsListeners() {
    Object.keys(this.inputs).forEach((index) => {
      this.inputs[index].addEventListener('input', this.handlerEntryInput);
    });
  }

  // очистка отображения ошибок
  clearErrorLabel() {
    Object.keys(this.inputs).forEach((index) => {
      this.popupForm.querySelector(`.popup__error_${this.inputs[index].name}`).textContent = '';
    });
  }

  // Валидация инпута с отображением ошибок

  static validInput(input, errorLabel, ERROR_DESCRIPTION) {
    if (input.value.length === 0) {
      document.querySelector(errorLabel).textContent = 'Это обязательное поле';
    } else if (!input.checkValidity()) {
      document.querySelector(errorLabel).textContent = ERROR_DESCRIPTION;
    } else {
      document.querySelector(errorLabel).textContent = '';
      return true;
    }
    return false;
  }
  // обработчик ввода в input

  handlerEntryInput(event) {
    this.popupForm.querySelector(`.popup__error_${event.target.name}`).textContent = '';
    let errorStr = '';
    if (event.target.type === 'text') errorStr = this.ERROR_TEXT;
    if (event.target.type === 'email') errorStr = this.ERROR_EMAIL;
    if (event.target.type === 'password') errorStr = this.ERROR_PASSWORD;

    Form.validInput(event.target, `.popup__error_${event.target.name}`, errorStr);
  }
  // обработчик ввода в form

  handlerInputForm() {
    this.popupForm.querySelector('.popup__button').disabled = true;

    const valid = !Object.keys(this.inputs).some(
      (index) => !this.inputs[index].checkValidity() || this.inputs[index].value === '',
    );

    if (valid) this.popupForm.querySelector('.popup__button').disabled = false;
  }
  // Обработчик нажатия кнопки для открытия popup

  formReset() {
    this.popupForm.reset();
    this.clearErrorLabel();
    this.popupForm.querySelector('.popup__button').setAttribute('disabled', true);
  }

  // Обработчик нажатия кнопки для добавления карточки

  submitForm(event) {
    this.handlerSubmit();
    event.preventDefault();
    this.popupForm.reset();
  }
}
