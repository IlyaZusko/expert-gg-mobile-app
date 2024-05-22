import * as Yup from 'yup';

export const PasswordChangeValidationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('required')
    .min(8, 'minPassword')
    .max(20, 'maxPassword')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
      'incorrectPassword',
    ),
  password: Yup.string()
    .required('required')
    .min(8, 'minPassword')
    .max(20, 'maxPassword')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
      'incorrectPassword',
    ),
  passwordConfirm: Yup.string()
    .required('required')
    .min(8, 'minPassword')
    .max(20, 'maxPassword')
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/, 'incorrectPassword')
    .oneOf([Yup.ref('password')], 'passwordMatch'),
});
