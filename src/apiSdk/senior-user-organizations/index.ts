import axios from 'axios';
import queryString from 'query-string';
import {
  SeniorUserOrganizationInterface,
  SeniorUserOrganizationGetQueryInterface,
} from 'interfaces/senior-user-organization';
import { GetQueryInterface } from '../../interfaces';

export const getSeniorUserOrganizations = async (query?: SeniorUserOrganizationGetQueryInterface) => {
  const response = await axios.get(`/api/senior-user-organizations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSeniorUserOrganization = async (seniorUserOrganization: SeniorUserOrganizationInterface) => {
  const response = await axios.post('/api/senior-user-organizations', seniorUserOrganization);
  return response.data;
};

export const updateSeniorUserOrganizationById = async (
  id: string,
  seniorUserOrganization: SeniorUserOrganizationInterface,
) => {
  const response = await axios.put(`/api/senior-user-organizations/${id}`, seniorUserOrganization);
  return response.data;
};

export const getSeniorUserOrganizationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/senior-user-organizations/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteSeniorUserOrganizationById = async (id: string) => {
  const response = await axios.delete(`/api/senior-user-organizations/${id}`);
  return response.data;
};
