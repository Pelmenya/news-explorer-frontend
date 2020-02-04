import ElementsListeners from './ElementsListeners';
import {
  ERROR_TEXT, ERROR_EMAIL, ERROR_PASSWORD, ERROR_REQUIRED_FIELD,
} from '../constants/errors';

export default class FormPopUp extends ElementsListeners {
  // Защищенные методы
  // Добавление слушателей для inputs
  _initalInputsListeners() {
    Object.keys(this.inputs).forEach((index) => {
      this.inputs[index].addEventListener('input', this._handlerEntryInput);
    });
  }

  // очистка отображения ошибок
  _clearErrorLabel() {
    Object.keys(this.inputs).forEach((index) => {
      this.popupForm.querySelector(`.popup__error_${this.inputs[index].name}`).textContent = '';
    });
  }

  // Валидация инпута с отображением ошибок
  _validInput(input, errorLabel, ERROR_DESCRIPTION) {
    this.input = input;
    if (this.input.value.length === 0) {
      document.querySelector(errorLabel).textContent = ERROR_REQUIRED_FIELD;
    } else if (!this.input.checkValidity()) {
      document.querySelector(errorLabel).textContent = ERROR_DESCRIPTION;
    } else {
      document.querySelector(errorLabel).textContent = '';
      return true;
    }
    return false;
  }

  // обработчик ввода в input
  _handlerEntryInput(event) {
    this.popupForm.querySelector(`.popup__error_${event.target.name}`).textContent = '';
    let errorStr = '';
    if (event.target.type === 'text') errorStr = this.ERROR_TEXT;
    if (event.target.type === 'email') errorStr = this.ERROR_EMAIL;
    if (event.target.type === 'password') errorStr = this.ERROR_PASSWORD;

    this._validInput(event.target, `.popup__error_${event.target.name}`, errorStr);
  }

  // обработчик ввода в form
  _handlerInputForm() {
    this.popupForm.querySelector('.button__popup').disabled = true;

    const valid = !Object.keys(this.inputs).some(
      (index) => !this.inputs[index].checkValidity() || this.inputs[index].value === '',
    );

    if (valid) this.popupForm.querySelector('.button__popup').disabled = false;
    this._setServerError('');
  }

  // Сброс в начальное состояние формы
  _formReset() {
    this.popupForm.reset();
    this._clearErrorLabel();
  }

  // Возвращает объект из полей input
  _getInfo() {
    const item = {};
    Object.keys(this.inputs).forEach((index) => {
      item[
        `${this.inputs[index].name}`.slice(0, `${this.inputs[index].name}`.length - 2)
      ] = this.inputs[index].value;
    });
    return item;
  }

  _setServerError(serverErr) {
    this.popupForm.querySelector('.popup__error_server').textContent = serverErr;
  }

  constructor(props, popup, handlerSubmit = null) {
    super(props);

    this.popup = popup;
    this.handlerSubmit = handlerSubmit;

    // текст ошибок в input
    this.ERROR_TEXT = ERROR_TEXT;
    this.ERROR_EMAIL = ERROR_EMAIL;
    this.ERROR_PASSWORD = ERROR_PASSWORD;

    // форма попапа
    this.popupForm = this.popup.querySelector('.popup__form');
    this.inputs = this.popupForm.querySelectorAll('.input');

    this.submitForm = this.submitForm.bind(this);
    this._handlerEntryInput = this._handlerEntryInput.bind(this);
    this._handlerInputForm = this._handlerInputForm.bind(this);

    this.popupForm.addEventListener('input', this._handlerInputForm);
    this.popupForm.addEventListener('submit', this.submitForm);

    this._formReset();
    this._initalInputsListeners();
    // Делаем при нажатии кнопки формы
    this.handlerSubmit = handlerSubmit;
  }

  submitForm(event) {
    this.handlerSubmit(this._getInfo())
      .then((serverErr) => this._setServerError(serverErr))
      .catch((err) => err);
    this._formReset();
    event.preventDefault();
  }
}
