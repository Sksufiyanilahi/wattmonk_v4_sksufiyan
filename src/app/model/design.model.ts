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

  export class Createdby {
    id?: number;
    username: string;
    email: string;
    provider: string;
    confirmed?: boolean;
    blocked?: boolean;
    role?: number;
    created_at?: Date;
    updated_at?: Date;
    firstname: string;
    lastname: string;
    phone: string;
    country: string;
    company: string;
    callingcode: string;
    address?: any;
    registrationnumber?: any;
    isdefaultpassword?: any;
    source: string;
    parent?: any;
    contractorsubscription?: any;
    addedby?: any;
    logo?: any;
  }

  export class Assignedto {
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
      comments: string;
      source: string;
      solarmake: Solarmake;
      solarmodel: Solarmodel;
      invertermake: Invertermake;
      invertermodel: Invertermodel;
      createdby: Createdby;
      assignedto: Assignedto;
  }



