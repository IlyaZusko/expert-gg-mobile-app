import * as Yup from 'yup';

export const EditProfileValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле')
    .min(4, 'Длина пароля не может быть меньше 4 символов')
    .max(75, 'Должно быть короче 75 символов'),
});
