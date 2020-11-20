import { ContractorLogo } from './user.model';

export class AssigneeModel {
  firstname: string;
  lastname: string;
  contractorlogo: ContractorLogo;
  id: number;
  selected = false;
  jobcount:number;
}
