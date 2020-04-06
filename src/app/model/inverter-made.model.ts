export class Invertermake {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export class InverterMadeModel {
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
  invertermake: Invertermake;
}


