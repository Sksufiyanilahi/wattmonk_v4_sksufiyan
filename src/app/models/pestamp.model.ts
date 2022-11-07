
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
    groupchatpassword: string;
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
    comments: any;
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
    stampedfiles:any;
    mountingtype:string;
    latitude: number;
  longitude: number;
  country: string;
  state: string;
  city:string;
  postalcode: string;
  modeofstamping:string;
  propertytype:string;
  jobtype:string;
  workinghours:any;
  requestdeclinereason:any;
  requestdeclineattachment:UploadedFile[];
  deliverychargespaymentstatus:string;
    deliverycharges:number;
    acceptedbypeengineer:boolean;
    declinedbypeengineer:boolean;
    revisioncomments:string;
    revisionattachments:UploadedFile[];
    isinrevisionstate:boolean;
    addedtogroupchat:boolean;
    thirdpartystamping: boolean;
    revisionpestamp: any;
    requestunholdreason:any;
    unhold:any;
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
    acceptedbystructuralpeengineer:any;
    acceptedbyelectricalpeengineer:any;
    electricalworkinghours:number;
    structuralworkinghours:number;
    iselectricalstampeduploaded:boolean;
    electricalstampedfiles:any;
    isstructuralstampeduploaded:boolean;
    structuralstampedfiles:any;
    onholdpestamp: any;
    propertysubtype: any;
    revisiondesign: any;
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

export class PEstampCount{
    completed: String;
    delivered: String;
    instamping: String;
    newpestamp: String;
    onhold: String;
}
