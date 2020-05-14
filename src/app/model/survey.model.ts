import { Image, User } from './user.model';
import { Invertermake, Invertermodel, Solarmake, Solarmodel } from './design.model';
import { ImageModel } from '../camera/menu.model';
import { InverterMadeModel } from './inverter-made.model';

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
  mspimages: Image[];
  utilitymeterimages: Image[];
  pvinverterimages: Image[];
  pvmeterimages: Image[];
  roofimages: Image[];
  modulemake: Solarmake;
  modulemodel: Solarmodel;
  invertermake: string;
  invertermodel: string;
  batterybackup: string;
  acdisconnect: string;
  mainbreakersize: number;
  mspbreaker: string;
  msplocation: string;
  msprating: number;
  numberofmodules: number;
  pvinverterlocation: string;
  pvmeter: string;
  servicefeedsource: string;
  utilitymeter: string;
  jobtype: string;
  interconnection: string;
  utility: InverterMadeModel;
}


