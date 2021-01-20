
import { User } from './user.model';
import { UploadedFile } from './uploadedfile.model';
//import { Activity } from './activity';
//import { Comment } from './comment';

export class Pestamp{
    id: number;
    name: string;
    personname : string;
    email: string;
    contactnumber : number;
    hardcopiesrequired : string;
    type: string;
    chatid: string;
    permitplan : UploadedFile[];
    atticphotos : UploadedFile[];
    roofphotos : UploadedFile[];
    hardcopies : number;
    shippingaddress : string;
    deliveryaddress:string;
    createdby: User;
    assignedto : User;
    designassignedto : User;
    reviewassignedto : User;
    length: any;
    created_at : string;
    updated_at : string;
    paymentstatus:string;
    comments: Comment[];
    activities : Activity[];
    source: string;
    status : string;
    outsourcedto : User;
    isoutsourced : string;
    actualdelivereddate : string;
    pestampstarttime: string;
    pestampendtime: string;
    pestampacceptancestarttime : string;
    pestampacceptanceendtime : string;
    stampedfiles:UploadedFile;
    mountingtype:string;
    latitude: number;
  longitude: number;
  country: string;
  state: string;
  city:string;
  postalcode: string;
  modeofstamping:string;
  propertytype:string;


    //Dynamic content
    designremainingtime : string;
    reviewremainingtime : string;
    pestampcurrentstatus : string;
    isoverdue : boolean = false;
    lateby : string;
    recordupdatedon : string;
    formattedpestamptype : string;
    isrecordcomplete : boolean = false;
    pestampacceptanceremainingtime: string;
    unreadmessagecount = 0;
}

export class Activity {
    id: number;
    activity: string;
    performer: User;
    created_at: string;
    type: string;
    recordid: string;
}

export class Comment{
    id : number;
    message : string;
    type : string;
    createdby : User;
}