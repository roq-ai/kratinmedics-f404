import { OrganizationUserInterface } from 'interfaces/organization-user';
import { SeniorUserOrganizationInterface } from 'interfaces/senior-user-organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  organization_user?: OrganizationUserInterface[];
  senior_user_organization?: SeniorUserOrganizationInterface[];
  user?: UserInterface;
  _count?: {
    organization_user?: number;
    senior_user_organization?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
