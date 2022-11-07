import { User } from "./user.model";

export class GroupModel {
    id: number;
    name:string;
    status:boolean;
    updated_at:Date;
    created_at:Date;
    description:string;
    clients:User[];
    members:User[];
  }