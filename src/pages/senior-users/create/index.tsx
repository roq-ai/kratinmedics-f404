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
import { createSeniorUser } from 'apiSdk/senior-users';
import { Error } from 'components/error';
import { seniorUserValidationSchema } from 'validationSchema/senior-users';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { SeniorUserInterface } from 'interfaces/senior-user';

function SeniorUserCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SeniorUserInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSeniorUser(values);
      resetForm();
      router.push('/senior-users');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SeniorUserInterface>({
    initialValues: {
      health_information: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: seniorUserValidationSchema,
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
            Create Senior User
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="health_information" mb="4" isInvalid={!!formik.errors?.health_information}>
            <FormLabel>Health Information</FormLabel>
            <Input
              type="text"
              name="health_information"
              value={formik.values?.health_information}
              onChange={formik.handleChange}
            />
            {formik.errors.health_information && (
              <FormErrorMessage>{formik.errors?.health_information}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
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
  entity: 'senior_user',
  operation: AccessOperationEnum.CREATE,
})(SeniorUserCreatePage);
