// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: "dev",
  Master_Role_Id: 15,
  // BaseUrl: "http://localhost:1337/",
  BaseUrl: "https://devspace.wattmonk.com/api/",
  firebase: {
    apiKey: "AIzaSyAcveVBoDUxk_VPNozqLR7ZZ4x1fyZoPxI",
    authDomain: "wattmonk-273002.firebaseapp.com",
    databaseURL: "https://wattmonk-273002.firebaseio.com",
    projectId: "wattmonk-273002",
    storageBucket: "wattmonk-273002.appspot.com",
    messagingSenderId: "554801985112",
    appId: "1:554801985112:web:4d1bd25b29924b9de53c2d",
    measurementId: "G-Y5FQXTC6DJ"
  },
  FIREBASE_DB_CONSTANTS: {
    KEYWORD: "devcomp_",
    SURVEY_KEYWORD: "dev_survey_"
  },
  COMETCHAT_CONSTANTS: {
    APP_ID: '2145560cac03137',
    REGION: 'US',
    API_KEY: '83ac811da8283c9e235ab912bf7a6213c207dd4d',
    REST_API_KEY: "4f441010f9ace69fc5e2471c20e9f1c21ca56402"
  },
  Mixpanel_CONSTANTS: 'e4b30b18d61b5abe078c2719911858cb',
 STRIPE_CONSTANTS: {
    PUBLISHABLE_KEY: 'pk_test_51HQ4cGCd1aF9ZjVZMxEWHOTjNhLTRlhxM4SFLM0lvC0fWQjJ6sxF6LLCWVWUw1ElECj2tZQKHuKkLoYysfhsn6LL00IC6pVMat',
    SECRET_KEY: 'sk_test_51HQ4cGCd1aF9ZjVZnAneBfBJAx1gAfdujzZmDr1n1fxainbvghzNqT7zNcxOgOgEFoMdFpsJ9zVkaCWMkvUKwchC00xKhj484A'
},
  PAYPAL_CONSTANTS:{
    CLIENT_ID:'AQ8yUi98saJfVRt5-u7DpiK0Fq-JeGV8h8_QNe8KFBziitabFvZKrxMBdDw_xqa8sGSq-0fNpAzgQwDt',
    CURRENCY:'USD',
  },
  ZOHO_SALESIQ_CONSTANTS: {
    WIDGET_CODE: `a86a9f994c41265b9143a523f63150b22cd725a9d4e41386abf91442f3abf29a`
  },
  
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
