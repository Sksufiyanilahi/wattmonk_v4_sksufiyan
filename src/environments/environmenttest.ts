export const environment = {
  production: false,
  name: "mavericks",
  Master_Role_Id: 12,
  Team_Head_Role_Id: 17,
  PeAdmin: 20,
  PESuperAdmin: 21,
  SuccessManager: 22,
  VAAgent: 23,
  RightAngle_Id: 1479,
  iRoof_Id: 1651,
  parentid: 544,
  BaseUrl: "https://mavericks.wattmonk.com/api/",
  // BaseUrl: "http://localhost:1337/",
  // BaseUrl: "https://devspace.wattmonk.com/api/",
  // BaseUrl: "https://testorbit.wattmonk.com/api/",
  //BaseUrl: "https://titans.wattmonk.com/api/",
  // BaseUrl: "http://138.197.201.126:2020/",
  // BaseUrl: "https://prelive.wattmonk.com/r1preliveserver/api/",
  // BaseUrl: "http://ec2-52-15-220-175.us-east-2.compute.amazonaws.com:1802/", // old live
  // BaseUrl: "http://ec2-52-54-180-221.compute-1.amazonaws.com:1802/", //new live
  // BaseUrl: "http://24.199.64.249:1801/", // new live URL
  StampingBaseUrl: "https://mavericks.wattmonk.com/api/",
  UploadFileUrl: "https://mavericks.wattmonk.com/api/",
  firebase: {
    apiKey: "AIzaSyAcveVBoDUxk_VPNozqLR7ZZ4x1fyZoPxI",
    authDomain: "wattmonk-273002.firebaseapp.com",
    databaseURL: "https://wattmonk-273002.firebaseio.com",
    projectId: "wattmonk-273002",
    storageBucket: "wattmonk-273002.appspot.com",
    messagingSenderId: "554801985112",
    appId: "1:554801985112:web:4d1bd25b29924b9de53c2d",
    measurementId: "G-Y5FQXTC6DJ",
  },
  FIREBASE_DB_CONSTANTS: {
    KEYWORD: "maverickscomp_",
  },
  COMETCHAT_CONSTANTS: {
    // mavericks server
    // APP_ID: "22738c62a78b107",
    // REGION: "US",
    // API_KEY: "3afc04a7495edb03f4c7c802096a954faf7e3a27",
    // REST_API_KEY: "4f441010f9ace69fc5e2471c20e9f1c21ca56402",
    // UNIQUE_CODE: "2020",
    // live server
    APP_ID: '190385dcec51285',
    REGION: 'US',
    API_KEY: '5cafae1939d4fc620698c50ae3f25e727fc90213',
    REST_API_KEY: "4f441010f9ace69fc5e2471c20e9f1c21ca56402",
    UNIQUE_CODE: "1802"
  },
  Mixpanel_CONSTANTS: "e4b30b18d61b5abe078c2719911858cb",
  ZOHO_SALESIQ_CONSTANTS: {
    WIDGET_CODE: `a86a9f994c41265b9143a523f63150b22cd725a9d4e41386abf91442f3abf29a`,
  },
  SALESFORCE: {
    CLIENT_ID: "3MVG9pRzvMkjMb6lC3Pq8GW7dg6eoSDR7MnZs61RwTD8z0AB9XPoLF685F7yem7MTdJ5Izy1gJFdlmANQPm80",
    CLIENT_SECRET: "5B708799B231224EA723EE9A5B8AB9B0627AB5FD624CE0E1288D63C2F828A363",
    REDIRECT_URI: `https://mavericks.wattmonk.com/home/oauth/callback`
  },
  PAYPAL_CONSTANTS: {
    CLIENT_ID:
      "AZgzxKKrYEu0WfsDnPalj5v67LZoUAu-aMfzakxHLF-mxizhIfaWdxuuVTDqJam6r940Xxv08Z4HyqnT",
    CURRENCY: "USD",
  },
  AwsConfig: {
    // mobile server
    accessKeyId: 'AKIAZWSE4E5CL6NMGT4W',
    secretAccessKey: 'ASveLd9p2CerUC+8AnAs887HWBnaub8gv3IjQ70/',
    s3BucketRegion: 'ap-south-1', // example: "us-west-2"
    s3BucketName: "wattmonk"    // example: "mycompany.testbucket"
     // demo wattmonk
    // APP_ID: "22738c62a78b107",
    // REGION: "US",
    // API_KEY: "3afc04a7495edb03f4c7c802096a954faf7e3a27",
    // REST_API_KEY: "4f441010f9ace69fc5e2471c20e9f1c21ca56402",
    // UNIQUE_CODE: "2021",
    // live wattmonk
    // APP_ID: '190385dcec51285',
    // REGION: 'US',
    // API_KEY: '5cafae1939d4fc620698c50ae3f25e727fc90213',
    // REST_API_KEY: "4f441010f9ace69fc5e2471c20e9f1c21ca56402",
    // UNIQUE_CODE: "1802"
    // unknown
    // APP_ID: '2145560cac03137',
    // REGION: 'US',
    // API_KEY: '83ac811da8283c9e235ab912bf7a6213c207dd4d',
    // REST_API_KEY: "4f441010f9ace69fc5e2471c20e9f1c21ca56402",
    // UNIQUE_CODE: "1337"
  },
  STRIPE_CONSTANTS: {
    PUBLISHABLE_KEY: 'pk_test_51HQ4cGCd1aF9ZjVZMxEWHOTjNhLTRlhxM4SFLM0lvC0fWQjJ6sxF6LLCWVWUw1ElECj2tZQKHuKkLoYysfhsn6LL00IC6pVMat',
    SECRET_KEY: 'sk_test_51HQ4cGCd1aF9ZjVZnAneBfBJAx1gAfdujzZmDr1n1fxainbvghzNqT7zNcxOgOgEFoMdFpsJ9zVkaCWMkvUKwchC00xKhj484A'
  },
  GOOGLE_API_KEY: "AIzaSyCePxz4wA_knfjvNBhV0RKzrySsf4o8QFU"
};
