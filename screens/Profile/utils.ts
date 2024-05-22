import * as Yup from 'yup';

export const EditProfileValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('required')
    .min(4, 'minUsername')
    .max(75, 'max'),
});

export const CallRequestValidationSchema = Yup.object().shape({
  phone: Yup.string().required('required').min(19, 'phoneMin'),
  name: Yup.string().required('required').min(2, 'min2').max(50, 'max50'),
  question: Yup.string().required('required').min(2, 'min2').max(50, 'max50'),
});
