import { User } from './user.model';
import { Invertermake, Invertermodel, Solarmake, Solarmodel } from './design.model';

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
  modulemake: Solarmake;
  modulemodel: Solarmodel;
  invertermake: Invertermake;
  invertermodel: Invertermodel;
  batterybackup: string;
  acdisconnect: boolean;
  mainbreakersize: number;
  mspbreaker: string;
  msplocation: string;
  msprating: number;
  numberofmodules: number;
  pvinverterlocation: string;
  pvmeter: boolean;
  servicefeedsource: string;
  utilitymeter: string;
}


