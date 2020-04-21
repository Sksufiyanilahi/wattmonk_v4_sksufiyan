import { User } from './user.model';

export class SurveyModel {
  id: number;
}

export class SurveyDataModel {
  id: number;
  name: string;
  email: string;
  phonenumber: string;
  datetime: Date;
  comments: string;
  created_at: Date;
  updated_at: Date;
  address: string;
  source: string;
  assignto?: User;
  createdby?: User;
  mspimages: any[];
  utilitymeterimages: any[];
  pvinverterimages: any[];
  pvmeterimages: any[];
  roofimages: any[];
}


