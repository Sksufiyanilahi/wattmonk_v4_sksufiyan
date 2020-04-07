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
  parent: Parent;

}

export class Role {
  id: number;
  name: string;
  description: string;
  type: string
}
  export class Parent {
      id: number;
      username: string;
      email: string;
      provider: string;
      confirmed: boolean;
      blocked: boolean;
      role: number;
      created_at: Date;
      updated_at: Date;
      firstname: string;
      lastname: string;
      phone?: any;
      country: string;
      company?: any;
      callingcode?: any;
      address?: any;
      registrationnumber?: any;
      isdefaultpassword?: any;
      source?: any;
      parent?: any;
      contractorsubscription?: any;
      logo?: any;
  }

  

