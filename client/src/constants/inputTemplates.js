export const loginInputTemplates = [
  {
    type: 'email',
    name: 'email',
    label: 'Е-пошта',
    id: 'email'
  },
  {
    type: 'password',
    name: 'password',
    label: 'Пароль',
    id: 'password'
  }
];

export const registrationInputTemplates = [
  {
    type: 'text',
    name: 'name',
    label: "Ім'я",
    id: 'name'
  },
  {
    type: 'email',
    name: 'email',
    label: 'Е-пошта',
    id: 'email'
  },
  {
    type: 'password',
    name: 'password',
    label: 'Пароль',
    id: 'password'
  }
];

export const personalInfoInputTemplates = [
  {
    type: 'text',
    name: 'surname',
    label: 'Прізвище',
    id: 'surname'
  },
  {
    type: 'text',
    name: 'name',
    label: "Ім'я",
    id: 'name'
  },

  {
    type: 'email',
    name: 'email',
    label: 'Е-пошта',
    id: 'email'
  },
  {
    type: 'tel',
    name: 'phone',
    label: 'Телефон',
    id: 'phone',
    placeholder: '+38 (0__) ___ __ __'
  },
  {
    type: 'text',
    name: 'city',
    label: 'Місто',
    id: 'city'
  },
  {
    type: 'text',
    name: 'address',
    label: 'Адреса',
    id: 'address'
  }
];

export const passwordInputTemplates = [
  {
    type: 'password',
    name: 'currentPassword',
    label: 'Старий пароль',
    id: 'currentPassword'
  },
  {
    type: 'password',
    name: 'newPassword',
    label: 'Новий пароль',
    id: 'newPassword'
  },
  {
    type: 'password',
    name: 'passwordConfirmation',
    label: 'Підтвердити новий пароль',
    id: 'passwordConfirmation'
  }
];

export const userOrderInputTemplates = [
  {
    type: 'text',
    name: 'surname',
    label: 'Прізвище',
    id: 'surname'
  },
  {
    type: 'text',
    name: 'name',
    label: "Ім'я",
    id: 'name'
  },

  {
    type: 'email',
    name: 'email',
    label: 'Е-пошта',
    id: 'email'
  },
  {
    type: 'tel',
    name: 'phone',
    label: 'Телефон',
    id: 'phone',
    placeholder: '+38 (0__) ___ __ __'
  }
];

export const adressInputTemplates = [
  {
    type: 'text',
    name: 'street',
    label: 'Вулиця',
    id: 'street'
  },
  {
    type: 'text',
    name: 'house',
    label: 'Будинок',
    id: 'house'
  },
  {
    type: 'text',
    name: 'apartment',
    label: 'Квартира',
    id: 'apartment'
  }
];

export const deliveryOptions = [
  'Самовивіз з Нової Пошти*',
  `Кур'єр Нової Пошти*`
];

export const paymentOptions = ['Оплата при отриманні', 'Оплата онлайн*'];

export const productDataInputs = [
  {
    id: 'productCode',
    type: 'text',
    label: 'Код товару',
    placeholder: 'Код ...'
  },
  {
    id: 'title',
    type: 'text',
    label: 'Назва товару',
    placeholder: 'Назва ...'
  },
  {
    id: 'slug',
    type: 'text',
    label: 'URL-частина/Slug',
    placeholder: 'Slug ...'
  },
  { id: 'price', type: 'text', label: 'Ціна', placeholder: 'Ціна ...' },
  {
    id: 'quantity',
    type: 'text',
    label: 'Кількість',
    placeholder: 'Кількість ...'
  },
  {
    id: 'discount',
    type: 'text',
    label: 'Знижка',
    placeholder: 'Знижка ...'
  },
  {
    id: 'category',
    type: 'text',
    label: 'Категорія',
    placeholder: 'Категорія ...'
  },
  { id: 'dateAdded', type: 'date', label: 'Дата' },
  {
    id: 'description',
    type: 'textarea',
    label: 'Опис',
    placeholder: 'Опис ...'
  }
];

export const productArrayTemplates = [
  {
    id: 'images',
    type: 'text',
    label: 'Зображення',
    placeholder: 'Посилання на зображення'
  },
  {
    id: 'sizes',
    type: 'number',
    label: 'Розміри',
    placeholder: 'Розмір ...'
  }
];

export const productParamInputs = [
  { id: 'Товар', type: 'text', label: 'Товар', placeholder: 'Товар ...' },
  { id: 'Тканина', type: 'text', label: 'Тканина', placeholder: 'Тканина ...' },
  { id: 'Колір', type: 'text', label: 'Колір', placeholder: 'Колір ...' },
  {
    id: 'Країна виробництва',
    type: 'text',
    label: 'Країна виробництва',
    placeholder: 'Країна виробництва ...'
  }
];
