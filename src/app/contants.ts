//Live Server
// export const BaseUrl = 'http://ec2-3-17-28-7.us-east-2.compute.amazonaws.com:1337';
// export const COMETCHAT_CONSTANTS = {
//     APP_ID: '190385dcec51285',
//     REGION: 'US',
//     API_KEY: '5cafae1939d4fc620698c50ae3f25e727fc90213'
// }

// Test Server
 export const PlatformUpdateUrl = 'https://testorbit.wattmonk.com/';
 export const BaseUrl = 'https://testorbit.wattmonk.com/api';
 export const COMETCHAT_CONSTANTS = {
     APP_ID: '22738c62a78b107',
      REGION: 'US',
      API_KEY: '3afc04a7495edb03f4c7c802096a954faf7e3a27'
  }

//Development Server
/*export const PlatformUpdateUrl = 'https://devspace.wattmonk.com/';
export const BaseUrl = 'https://devspace.wattmonk.com/api';
export const COMETCHAT_CONSTANTS = {
   APP_ID: '2145560cac03137',
   REGION: 'US',
   API_KEY: '83ac811da8283c9e235ab912bf7a6213c207dd4d'
}*/
export enum ROLES {
    SuperAdmin = 4,
    ContractorSuperAdmin = 6,
    ContractorAdmin = 7,
    Admin = 5,
    BD = 3,
    Designer = 8,
    Surveyor = 9,
    Analyst = 10
}

