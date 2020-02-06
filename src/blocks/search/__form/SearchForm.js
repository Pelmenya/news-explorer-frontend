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
    if (this._getInfo()) {
      this.handlerSubmit(this._getInfo());
      this._formReset();
    }
    event.preventDefault();
  }
}
