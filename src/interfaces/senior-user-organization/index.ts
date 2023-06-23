import { SeniorUserInterface } from 'interfaces/senior-user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SeniorUserOrganizationInterface {
  id?: string;
  senior_user_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  senior_user?: SeniorUserInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface SeniorUserOrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  senior_user_id?: string;
  organization_id?: string;
}
