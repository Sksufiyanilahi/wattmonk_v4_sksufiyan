export class UserData{
    firstname:string;
    lastname:string;
    role:{
        id:number;
        name:string;
        type:string;
    };
    logo:{
        url:string
    }
    parent:{
        id:number;
    }
    peengineertype:string;
}