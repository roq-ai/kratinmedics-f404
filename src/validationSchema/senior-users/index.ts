import * as yup from 'yup';

export const seniorUserValidationSchema = yup.object().shape({
  health_information: yup.string(),
  user_id: yup.string().nullable(),
});
