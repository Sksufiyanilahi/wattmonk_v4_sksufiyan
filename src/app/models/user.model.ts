export class User {
  id: number;
  username: string;
  email: string;
  amount:number;
  designertype:string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: Role;
  created_at: string;
  updated_at: string;
  firstname: string;
  lastname: string;
  phone: string;
  country: string;
  company: string;
  callingcode: string;
  address: string;
  registrationnumber: string;
  isdefaultpassword: string;
  contractorlogo: ContractorLogo;
  parent: User;
  isonboardingcompleted:boolean;
  logo:{
    url:string;
  };
  ispaymentmodeprepay:boolean;
  peengineertype:string;
  hard_logout: boolean;
  usertype:string;
  selected = false;
  jobcount:number;
  displayname:string;
  addedby:any;
  minpermitdesignaccess:boolean;
  cometchatuid:any;
  source:string;
  userprofile:any;
  accessrights:any;
}

export class ContractorLogo {
  id: number;
  logo: Image;

}

export class Image {
  url: string;
  id: number;
  name:string;
  ext:string;
}

export class Role {
  id: number;
  name: string;
  description: string;
  type: string;
  displayname:string;
}
