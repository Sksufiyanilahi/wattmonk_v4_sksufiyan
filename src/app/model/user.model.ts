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
  logo: string;

}

export class Role {
  id: number;
  name: string;
  description: string;
  type: string
}
