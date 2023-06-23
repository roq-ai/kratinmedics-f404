import * as yup from 'yup';

export const seniorUserOrganizationValidationSchema = yup.object().shape({
  senior_user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
