import { SeniorUserOrganizationInterface } from 'interfaces/senior-user-organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SeniorUserInterface {
  id?: string;
  user_id?: string;
  health_information?: string;
  created_at?: any;
  updated_at?: any;
  senior_user_organization?: SeniorUserOrganizationInterface[];
  user?: UserInterface;
  _count?: {
    senior_user_organization?: number;
  };
}

export interface SeniorUserGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  health_information?: string;
}
