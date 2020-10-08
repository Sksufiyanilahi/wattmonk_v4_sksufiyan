import { User } from './user.model';

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
  phonenumber: string;
  created_at: Date;
  updated_at: Date;
  address: string;
  rooftype: string;
  jobtype: string;
  newconstruction: any;
  projecttype: string;
  comments: {};
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
  deliverydate:any;
  formattedjobtype : string;
  totalpercent : number;
  status:string;
  reviewstarttime:any;
  designstarttime:any;
  attachments:any=[];
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


