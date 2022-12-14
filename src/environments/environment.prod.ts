export const environment = {
  production: true,
  name: "prod",
  // BaseUrl: "https://webops.wattmonk.com/api/",
  // BaseUrl: "https://admin.wattmonk.com/api/",
  // BaseUrl: "http://ec2-52-15-220-175.us-east-2.compute.amazonaws.com:1802/",
  // BaseUrl: "http://ec2-52-54-180-221.compute-1.amazonaws.com:1802/",
  BaseUrl: "http://24.199.64.249:1801/", // new live URL
  INTERCOM_APPID: "o52f08q6",
  firebase: {
    apiKey: "AIzaSyCUeAsEj_4_7YTENw2l8y8bMB4fntNXo-4",
    authDomain: "livewattmonk.firebaseapp.com",
    databaseURL: "https://livewattmonk.firebaseio.com",
    projectId: "livewattmonk",
    storageBucket: "livewattmonk.appspot.com",
    messagingSenderId: "915613059391",
    appId: "1:915613059391:web:6795f60d6bb9f186abeb8a",
    measurementId: "G-NVZGTGR3TB"
  },
  FIREBASE_DB_CONSTANTS: {
    KEYWORD: "comp_",
    SURVEY_KEYWORD: "survey_"
  },
  COMETCHAT_CONSTANTS: {
    APP_ID: '190385dcec51285',
    REGION: 'US',
    API_KEY: '5cafae1939d4fc620698c50ae3f25e727fc90213',
    REST_API_KEY: "4f441010f9ace69fc5e2471c20e9f1c21ca56402",
    UNIQUE_CODE: "1802"
  },
  Mixpanel_CONSTANTS: 'ccc977a0c5a19d60a803d959c8b1da45',
  STRIPE_CONSTANTS: {
    PUBLISHABLE_KEY: 'pk_live_51HQ4cGCd1aF9ZjVZgEfAOB6VCZ0ejwkGMH4xpaREeKKOrXYBAFgPxlUFRs6UTAjwvzPT97MXxMY7sk0mXJyzKbf900zmeRBEew',
    SECRET_KEY: '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'
  },
  ZOHO_SALESIQ_CONSTANTS: {
    WIDGET_CODE: `222198be057a78bf7c8a64aaf3ed15a7ef39b58bc4c5a83a9f402741d247490d`
  },
  PAYPAL_CONSTANTS: {
    CLIENT_ID:
      "ASU9QSFKFXPKTJKbWLldRDbfgQE75JofKHk08YaCd3ntjhrhLn4ctlqzQJhUZ5mjKOKw4KWqKL4CLoxc",
    CURRENCY: "USD",
  },
  AwsConfig: {
    accessKeyId: 'AKIAZWSE4E5CL6NMGT4W',
    secretAccessKey: 'ASveLd9p2CerUC+8AnAs887HWBnaub8gv3IjQ70/',
    s3BucketRegion: 'us-east-1', // example: "us-west-2"
    s3BucketName: "wattmonkprodbucket"    // example: "mycompany.testbucket"
  },
  Master_Role_Id: 12,
  Team_Head_Role_Id: 17,
  PeAdmin: 20,
  PESuperAdmin: 21,
  SuccessManager: 22,
  VAAgent: 23
};
