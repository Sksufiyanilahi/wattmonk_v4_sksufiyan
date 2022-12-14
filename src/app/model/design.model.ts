import { Incentive } from './incentive.model';
import { User } from './user.model';
import { Utility } from './utility.model';
import { UtilityRates } from './utilityrate.model';

export class DesignModel {
  date: string;
  designs: DesignDetails[];
}

export class DesignDetails {
  customer: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
}

export class Solarmake {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export class Solarmodel {
  id: number;
  name: string;
  modulemodel?: any;
  created_at: Date;
  updated_at: Date;
  description: string;
  nameplatepmax: string;
  ptc: string;
  numberofcells: number;
  isc: number;
  voc: number;
  ipmax: number;
  vpmax: number;
  tempcoefofvoc: number;
  fuserating: number;
  length: number;
  width: number;
  area: number;
  weight: number;
  modulemake: number;
}

export class Invertermake {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export class Invertermodel {
  id: number;
  name: string;
  type: string;
  phase: number;
  ratedacvoltage: number;
  rateoutputpower?: any;
  numberofmpptchannels: number;
  currentpermppta: number;
  maximuminputvoltage: number;
  nominalinputvoltage: number;
  startupvoltage: number;
  maximuminputcurrent: number;
  maximumoutputcurrent: number;
  cecefficiency: number;
  datasheetavailable: boolean;
  maximumocpdrating: number;
  created_at: Date;
  updated_at: Date;
  invertermake?: any;
}

export class DesginDataModel {
  id: number;
  name: string;
  email: string;
  monthlybill: number;
  chatid:string;
  phonenumber: string;
  created_at: Date;
  updated_at: Date;
  address: string;
  company: any;
  rooftype: string;
  jobtype: string;
  newconstruction: any;
  projecttype: string;
  comments: any;
  source: string;
  solarmake: Solarmake;
  solarmodel: Solarmodel;
  invertermake: Invertermake;
  invertermodel: Invertermodel;
  createdby: User;
  assignedto: User;
  designassignedto: User;
  latitude: number;
  longitude: number;
  country: string;
  state: string;
  city:string;
  postalcode: string;
  type:string;
  mountingtype:string;
  tiltofgroundmountingsystem:string;
  architecturaldesign:any=[];
  prelimdesign:any;
  permitdesign:any;
  deliverydate:any;
  formattedjobtype : string;
  totalpercent : number;
  status:string;
  reviewstarttime:any;
  designstarttime:any;
  designacceptancestarttime:any;
  designacceptanceremainingtime:any;
  attachments:any=[];
  designremainingtime:any;
  isinrevisionstate: any;
  revisionattachments: any;
  isoverdue:boolean = false;
  lateby:any;
  reviewassignedto:any;
  reviewissues:any;
  revisioncomments:any;
  requestdeclinereason:any;
  requestdeclineattachment:any;
  isoutsourced:any;
  requesttype:string;
  recordupdatedon:any;
  addedtogroupchat:boolean;
  requirementtype:string;
  utility: Utility;
  utilityrate : UtilityRates
  annualutilityescalation : string;
  incentive : Incentive
  costofsystem : number;
  personname : string;
  companylogo : any;
  tiltgroundmount:string;
  inverterscount:string;
  mpurequired:boolean;
  revisiondesign :any=[];
 
}

export class PrelimDesign{
  created_at:string;
  ext:string;
  name:string;
  url:string;
  updated_at:string;

}
 export class activities{
   id:number;
   activity:string
 }
 export class arcFile{
  name:string;
  type:string;
}

export class prelimCounts{
  completed: String;
  delivered: String;
  indesigning: String;
  inreviewdesign: String;
  newdesign: String;
}

export class permitCounts{
  completed: String;
  delivered: String;
  indesigning: String;
  inreviewdesign: String;
  newdesign: String;
}


