import {Image, User} from './user.model';
import {Invertermake, Solarmake, Solarmodel} from './design.model';
// import { ImageModel } from '../camera/menu.model';
import {InverterMadeModel} from './inverter-made.model';

export class SurveyModel {
  id: number;
}

export class SurveyDataModel {
  id: number;
  name: string;
  email: string;
  chatid: string;
  phonenumber: string;
  datetime: Date;
  comments: any;
  created_at: Date;
  updated_at: Date;
  address: string;
  source: string;
  assignedto?: User;
  createdby?: any;
  mspimages: Image[];
  utilitymeterimages: Image[];
  acdisconnectimages: Image[];
  pvinverterimages: Image[];
  existingsubpanelimages: Image[];
  appliancesimages: Image[];
  atticimages: Image[];
  roofdimensionimages: Image[];
  obstaclesimages: Image[];
  obstaclesdimensionsimages: Image[];
  pvmeterimages: Image[];
  roofimages: Image[];
  modulemake: Solarmake;
  modulemodel: Solarmodel;
  invertermake: Invertermake;
  invertermodel: InverterMadeModel;
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
  status: string;
  latitude: string;
  longitude: string;
  totalpercent: number;
  remainingfilestoupload: number;
  isoverdue: boolean;
  formattedjobtype: string;
  solarpanelsimages: Image[];
  electricalslocation: any
  lateby: any;
  city: string;
  state: string;
  country: string;
  postalcode: number;
  reviewissues: String;
  reviewassignedto: any;
  invertermanufacturerandmodel: any;
  existingsolarsystem: any;
  framing: any;
  framingsize: any;
  distancebetweentworafts: any;
  batterysystem: any;
  isdesignraised: boolean = false;
  recordupdatedon: any;
  surveypdf?: any;
  rooftilt?: any;
  utilitybillback?: any;
  utilitybillfront?: any;
  mpurequired?: any;
  roofmaterial?: any;
  projecttype:string;
  additionalnotes:string;
  interconnectiondetails: string;
  addedtogroupchat: boolean;
  company:string;
  newconstruction:string;
  detailsofbatterysystem:string;
  esid:string;
  sizeofsingleraft:any;
  requesttype:string;
  meternumber:string;
  hoadetails:any;
  hoaattachments:Image[];
  subpanelmainbreakersize: number;
  subpanelbreaker: string;
  subpanellocation: string;
  subpanelrating: number;
}

export class SurveyCount{
  completed: String;
delivered: String;
inprocess: String;
inreview: String;
newsurvey: String;
}


