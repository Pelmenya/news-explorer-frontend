import { normalizeKeyWord } from '../../../js/utilits/functions';

export default class SearchNewsForm {
  // Защищенные методы
  // Сброс в начальное состояние формы
  _formReset() {
    this.form.reset();
  }

  // Возвращает keyword из поля input
  _getInfo() {
    return normalizeKeyWord(this.formInput.value);
  }

  _disabledForm() {
    Object.keys(this.form.elements).forEach((item) => {
      this.form.elements[item].disabled = true;
    });
  }

  _enabledForm() {
    Object.keys(this.form.elements).forEach((item) => {
      this.form.elements[item].disabled = false;
    });
  }

  constructor(form, handlerSubmit) {
    this.form = form;
    this.formInput = this.form.querySelector('.search__keywords');

    this.submitForm = this.submitForm.bind(this);
    this.form.addEventListener('submit', this.submitForm);
    this.handlerSubmit = handlerSubmit;
  }

  create() {
    this._formReset();
  }

  submitForm(event) {
    this._disabledForm();
    if (this._getInfo()) {
      this.handlerSubmit(this._getInfo());
    }
    this._enabledForm();

    event.preventDefault();
  }
}
