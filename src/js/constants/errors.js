// Ошибки при запросе на api News
const ERROR_SERVER_NEWS_DESCRIPTION = '«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»';
const ERROR_SERVER_NEWS = 'Возникла ошибка при обращении на сервер!';

// Ошибки при запросе на api Users
const ERROR_SAVE_CARD = 'К сожалению не у далось сохранить карточку. Скорее всего параметры не проходят валидацию';
const ERROR_DELETE_CARD = 'К сожалению не у далось удалить карточку. Скорее всего параметры не проходят валидацию';

// форма
const ERROR_TEXT = 'Должно быть от 2 до 30 символов';
const ERROR_EMAIL = 'Неправильный формат email';
const ERROR_PASSWORD = 'Неправильный пароль. Должен быть не меньше 6 символов';
const ERROR_REQUIRED_FIELD = 'Это обязательное поле';

export {
  ERROR_SERVER_NEWS,
  ERROR_SERVER_NEWS_DESCRIPTION,
  ERROR_TEXT,
  ERROR_EMAIL,
  ERROR_PASSWORD,
  ERROR_REQUIRED_FIELD,
  ERROR_DELETE_CARD,
  ERROR_SAVE_CARD,
};