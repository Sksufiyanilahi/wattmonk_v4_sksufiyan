import {environment} from "../environments/environment";

export const BaseUrl = environment.BaseUrl;

export const COMETCHAT_CONSTANTS = environment.COMETCHAT_CONSTANTS;
export const Mixpanel_CONSTANTS = environment.Mixpanel_CONSTANTS;
export const STRIPE_CONSTANTS = environment.STRIPE_CONSTANTS;
export const FIREBASE_DB_CONSTANTS = environment.FIREBASE_DB_CONSTANTS;
export const ZOHO_SALESIQ_CONSTANTS = environment.ZOHO_SALESIQ_CONSTANTS;

export const GOOGLE_API_KEY = "AIzaSyCePxz4wA_knfjvNBhV0RKzrySsf4o8QFU";


export const Subsection_Items_Limit = 500;

export enum ROLES {
    SuperAdmin = 4,
    ContractorSuperAdmin = 6,
    ContractorAdmin = 7,
    Admin = 5,
    BD = 3,
    Designer = 8,
    Surveyor = 9,
    Analyst = 10,
    Peengineer = 11,
    Master = environment.Master_Role_Id,
}

export const MAILFORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
export const ADDRESSFORMAT = /^[#.0-9a-zA-Z\u00C0-\u1FFF\u2800-\uFFFD &_)*#/('\s,-]+$/;