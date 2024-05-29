import * as Yup from 'yup';

export const LogInValidationSchema = Yup.object().shape({
  email: Yup.string().required('required').max(75, 'max').email('email'),
  password: Yup.string()
    .required('required')
    .min(8, 'minPassword')
    .max(20, 'maxPassword')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
      'incorrectPassword',
    ),
});

export const PasswordRecoveryValidationSchema = Yup.object().shape({
  email: Yup.string().required('required').max(75, 'max').email('email'),
});

export const SignUpValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('required')
    .min(4, 'minUsername')
    .max(75, 'max'),
  email: Yup.string().required('required').max(75, 'max').email('email'),
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
