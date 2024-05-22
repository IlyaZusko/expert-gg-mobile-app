import * as Yup from 'yup';

export const EditProfileValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('required')
    .min(4, 'minUsername')
    .max(75, 'max'),
});
