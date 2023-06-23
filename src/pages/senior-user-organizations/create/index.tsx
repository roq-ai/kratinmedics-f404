import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createSeniorUserOrganization } from 'apiSdk/senior-user-organizations';
import { Error } from 'components/error';
import { seniorUserOrganizationValidationSchema } from 'validationSchema/senior-user-organizations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SeniorUserInterface } from 'interfaces/senior-user';
import { OrganizationInterface } from 'interfaces/organization';
import { getSeniorUsers } from 'apiSdk/senior-users';
import { getOrganizations } from 'apiSdk/organizations';
import { SeniorUserOrganizationInterface } from 'interfaces/senior-user-organization';

function SeniorUserOrganizationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SeniorUserOrganizationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSeniorUserOrganization(values);
      resetForm();
      router.push('/senior-user-organizations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SeniorUserOrganizationInterface>({
    initialValues: {
      senior_user_id: (router.query.senior_user_id as string) ?? null,
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: seniorUserOrganizationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Senior User Organization
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<SeniorUserInterface>
            formik={formik}
            name={'senior_user_id'}
            label={'Select Senior User'}
            placeholder={'Select Senior User'}
            fetcher={getSeniorUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.health_information}
              </option>
            )}
          />
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'senior_user_organization',
  operation: AccessOperationEnum.CREATE,
})(SeniorUserOrganizationCreatePage);
