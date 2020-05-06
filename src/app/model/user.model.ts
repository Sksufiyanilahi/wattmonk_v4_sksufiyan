export class User {
  id: number;
  username: string;
  email: string;
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

}

export class ContractorLogo {
  id: number;
  logo: Image;

}

export class Image {
  url: string;
  id: number;
}

export class Role {
  id: number;
  name: string;
  description: string;
  type: string;
}
