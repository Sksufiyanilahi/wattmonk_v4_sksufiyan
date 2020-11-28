// import { MenuModel, QuestionType } from '../camera/menu.model';
import { Equipment } from './solar-make.model';

export enum ScheduleFormEvent {
  NO_EVENT = 0,
  SAVE_DESIGN_FORM = 1,
  SAVE_SURVEY_FORM = 2,
  START_SURVEY = 3,
  SEND_DESIGN_FORM = 4,
  PAY_EVENT=5,
  SEND_VALUE = 6,
  SEND_DESIGNERS_VALUE = 7,
  SEND_ANALYSTS_VALUE = 8,
  SEND_PERMIT_FORM =9,
  SAVE_PERMIT_FORM = 10
}

export enum UserRoles {
  ADMIN = 5,
  BD = 3,
  DESIGNER = 8,
  SURVEYOR = 9,
  ANALYST = 10
}

export enum MapPageType {
  CAMERA_INTERFACE = 0,
  IMAGE_PREVIEW = 1,
  IMAGE_PREVIEW_WITH_OPTIONS = 2,
  DETAILS_FORM = 3,
  NONE = 4,
  MAP_PAGE = 5
}

export const INVALID_EMAIL_MESSAGE = 'Invalid Email';
export const FIELD_REQUIRED = 'This field is required';
export const INVALID_NAME_MESSAGE='Invalid Name';
export const INVALID_ANNUAL_UNIT = 'Invalid Annual Unit';
export const INVALID_TILT_FOR_GROUND_MOUNT = 'Invalid Value';
export const INVALID_PHONE_NUMBER = 'Phone should be of min. 8 and max. 15 characters.'

export const COMET_CHAT_APP_ID = '190385dcec51285';
export const COMET_CHAT_AUTH_KEY = '5cafae1939d4fc620698c50ae3f25e727fc90213';
export const COMET_CHAT_REGION = 'us';

export const GOOGLE_API_KEY = 'AIzaSyCePxz4wA_knfjvNBhV0RKzrySsf4o8QFU';

// export const CAMERA_MODULE_MENU_BATTERY: MenuModel[] = [
//   {
//     name: 'Electricals',
//     isSelected: true,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'MSP',
//         isSelected: true,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Long Shot',
//             popupTitle: 'Confirm',
//             showPopup: true,
//             popupQuestion: 'Is MSP location inside or outside of building?',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Inside', 'Outside'],
//             givenAnswer: '',
//             formValueToUpdate: 'msplocation',
//             imageUploadTag: 'mspimages',
//             imageName: 'msplongshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Open Shutter, Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Main Breaker Size',
//             questionType: QuestionType.INPUT_NUMBER,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: 'mainbreakersize',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspopenshutterzoomshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'MSP Rating',
//             questionType: QuestionType.INPUT_NUMBER,
//             questionOptions: ['MSP Rating', 'Bus Rating'],
//             givenAnswer: '',
//             formValueToUpdate: 'msprating',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspzoomshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Without Cover, Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Main breaker location in MSP',
//             questionType: QuestionType.RADIO_BUTTON,
//             questionOptions: ['Top', 'Bottom', 'Center'],
//             givenAnswer: '',
//             formValueToUpdate: 'mspbreaker',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspwithoutcovershot'
//           }
//         ]
//       },
//       {
//         name: 'PV Inverter',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Wide angle shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Inverter Location',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Inside', 'Outside'],
//             givenAnswer: '',
//             formValueToUpdate: 'pvinverterlocation',
//             imageUploadTag: 'pvinverterimages',
//             imageName: 'pvinverterwideshoturl'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Inverter manufacture model',
//             questionType: QuestionType.INVERTER_MODEL,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'pvinverterimages',
//             imageName: 'pvinverterzoomshoturl'
//           }
//         ]
//       },
//       {
//         name: 'PV Meter',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: true,
//         answered: false,
//         questionToAsk: 'Is PV meter installed in premises',
//         formControlToUpdate: 'pvmeter',
//         images: [
//           {
//             image: '',
//             imageTitle: 'PV Meter',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Inverter Location',
//             questionType: QuestionType.NONE,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'pvmeterimages',
//             imageName: 'pvmeterwideshoturl'
//           }
//         ]
//       },
//       {
//         name: 'AC Disconnect',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: true,
//         answered: false,
//         questionToAsk: 'Is AC disconnected?',
//         formControlToUpdate: 'acdisconnect',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Wide Angle Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Inverter Location',
//             questionType: QuestionType.NONE,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'acdisconnectimages',
//             imageName: 'acdisconnectwideshoturl'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Inverter Location',
//             questionType: QuestionType.NONE,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'acdisconnectimages',
//             imageName: 'acdisconnectzoomshoturl'
//           }
//         ]
//       },
//       {
//         name: 'Utility Meter',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Wide angle shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Is Utility meter is attached or detached with MSP?',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Attach', 'Detach'],
//             givenAnswer: '',
//             formValueToUpdate: 'utilitymeter',
//             imageUploadTag: 'utilitymeterimages',
//             imageName: 'umwideshoturl'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Utility Name',
//             questionType: QuestionType.UTILITIES,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'utilitymeterimages',
//             imageName: 'umzoomshoturl'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Solar',
//     isSelected: false,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'Panels',
//         isSelected: true,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [{
//           image: '',
//           imageTitle: 'Wide angle shot',
//           showPopup: false,
//           popupTitle: 'Confirm',
//           popupQuestion: 'Number of Modules',
//           questionType: QuestionType.INPUT_NUMBER,
//           questionOptions: [],
//           givenAnswer: '',
//           formValueToUpdate: 'numberofmodules',
//           imageUploadTag: 'roofimages',
//           imageName: 'solarpanels'
//         }]
//       }
//     ]
//   },
//   {
//     name: 'Roof',
//     isSelected: false,
//     imageModel: [{
//       image: '',
//       imageTitle: '',
//       popupTitle: 'Confirm',
//       showPopup: false,
//       popupQuestion: '',
//       questionType: QuestionType.MORE_PHOTOS,
//       questionOptions: [],
//       givenAnswer: '',
//       formValueToUpdate: '',
//       imageUploadTag: 'roofimages',
//       imageName: 'modulewideshoturl1'
//     }],
//     subMenu: []
//   },
//   {
//     name: 'Appliances',
//     isSelected: false,
//     imageModel: [{
//       image: '',
//       imageTitle: '',
//       popupTitle: 'Appliance Name',
//       showPopup: false,
//       popupQuestion: 'Please enter appliance name',
//       questionType: QuestionType.MORE_PHOTOS_WITH_INPUT_STRING,
//       questionOptions: [],
//       givenAnswer: '',
//       formValueToUpdate: '',
//       imageUploadTag: 'appliancesimages',
//       imageName: 'appliances1'
//     }],
//     subMenu: []
//   },
//   {
//     name: 'Details',
//     isSelected: false,
//     imageModel: null,
//     subMenu: null
//   }
// ];

// export const CAMERA_MODULE_MENU_PV: MenuModel[] = [
//   {
//     name: 'Electricals',
//     isSelected: true,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'MSP',
//         isSelected: true,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Long Shot',
//             popupTitle: 'Confirm',
//             showPopup: true,
//             popupQuestion: 'Is MSP location inside or outside of building?',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Inside', 'Outside'],
//             givenAnswer: '',
//             formValueToUpdate: 'msplocation',
//             imageUploadTag: 'mspimages',
//             imageName: 'msplongshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Open Shutter, Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Main Breaker Size',
//             questionType: QuestionType.INPUT_NUMBER,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: 'mainbreakersize',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspopenshutterzoomshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'MSP Rating',
//             questionType: QuestionType.INPUT_NUMBER,
//             questionOptions: ['MSP Rating', 'Bus Rating'],
//             givenAnswer: '',
//             formValueToUpdate: 'msprating',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspzoomshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Without Cover, Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Main breaker location in MSP',
//             questionType: QuestionType.RADIO_BUTTON,
//             questionOptions: ['Top', 'Bottom', 'Center'],
//             givenAnswer: '',
//             formValueToUpdate: 'mspbreaker',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspwithoutcovershot'
//           }
//         ]
//       },
//       {
//         name: 'Existing Sub Panel',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.NONE,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'existingsubpanelimages',
//             imageName: 'Existingsubpanelimages'
//           }
//         ]
//       },
//       {
//         name: 'Utility Meter',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Wide angle shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Is Utility meter is attached or detached with MSP?',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Attach', 'Detach'],
//             givenAnswer: '',
//             formValueToUpdate: 'utilitymeter',
//             imageUploadTag: 'utilitymeterimages',
//             imageName: 'umwideshoturl'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Utility Name',
//             questionType: QuestionType.UTILITIES,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'utilitymeterimages',
//             imageName: 'umzoomshoturl'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Roof',
//     isSelected: false,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'Roof Photos',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'roofimages',
//             imageName: 'moduleshot1'
//           }
//         ]
//       },
//       {
//         name: 'Roof Dimensions',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'roofdimensionimages',
//             imageName: 'roofdimensions1'
//           }
//         ]
//       },
//       {
//         name: 'Obstacle Photos',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'obstaclesimages',
//             imageName: 'obstaclesphotos1'
//           }
//         ]
//       },
//       {
//         name: 'Obstacle Dimensions',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'obstaclesdimensionsimages',
//             imageName: 'obstaclesdimensions1'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Attic',
//     isSelected: false,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'Attic Photos',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'atticimages',
//             imageName: 'atticphotos1'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Appliances',
//     isSelected: false,
//     imageModel: [{
//       image: '',
//       imageTitle: '',
//       popupTitle: 'Appliance Name',
//       showPopup: false,
//       popupQuestion: 'Please enter appliance name',
//       questionType: QuestionType.MORE_PHOTOS_WITH_INPUT_STRING,
//       questionOptions: [],
//       givenAnswer: '',
//       formValueToUpdate: '',
//       imageUploadTag: 'appliancesimages',
//       imageName: 'appliances1'
//     }],
//     subMenu: []
//   },
//   {
//     name: 'Details',
//     isSelected: false,
//     imageModel: null,
//     subMenu: null
//   }
// ];

// export const CAMERA_MODULE_MENU_PV_BATTERY: MenuModel[] = [
//   {
//     name: 'Electricals',
//     isSelected: true,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'MSP',
//         isSelected: true,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Long Shot',
//             popupTitle: 'Confirm',
//             showPopup: true,
//             popupQuestion: 'Is MSP location inside or outside of building?',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Inside', 'Outside'],
//             givenAnswer: '',
//             formValueToUpdate: 'msplocation',
//             imageUploadTag: 'mspimages',
//             imageName: 'msplongshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Open Shutter, Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Main Breaker Size',
//             questionType: QuestionType.INPUT_NUMBER,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: 'mainbreakersize',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspopenshutterzoomshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'MSP Rating',
//             questionType: QuestionType.INPUT_NUMBER,
//             questionOptions: ['MSP Rating', 'Bus Rating'],
//             givenAnswer: '',
//             formValueToUpdate: 'msprating',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspzoomshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Without Cover, Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Main breaker location in MSP',
//             questionType: QuestionType.RADIO_BUTTON,
//             questionOptions: ['Top', 'Bottom', 'Center'],
//             givenAnswer: '',
//             formValueToUpdate: 'mspbreaker',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspwithoutcovershot'
//           }
//         ]
//       },
//       {
//         name: 'Existing Sub Panel',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.NONE,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'existingsubpanelimages',
//             imageName: 'existingsubpanelimages'
//           }
//         ]
//       },
//       {
//         name: 'Location of Battery',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.NONE,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'roofimages',
//             imageName: 'locationofbattery'
//           }
//         ]
//       },
//       {
//         name: 'Utility Meter',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Wide angle shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Is Utility meter is attached or detached with MSP?',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Attach', 'Detach'],
//             givenAnswer: '',
//             formValueToUpdate: 'utilitymeter',
//             imageUploadTag: 'utilitymeterimages',
//             imageName: 'umwideshoturl'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Utility Name',
//             questionType: QuestionType.UTILITIES,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'utilitymeterimages',
//             imageName: 'umzoomshoturl'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Roof',
//     isSelected: false,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'Roof Photos',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'roofimages',
//             imageName: 'moduleshot1'
//           }
//         ]
//       },
//       {
//         name: 'Roof Dimensions',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'roofdimensionimages',
//             imageName: 'roofdimensions1'
//           }
//         ]
//       },
//       {
//         name: 'Obstacle Photos',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'obstaclesimages',
//             imageName: 'obstaclephotos1'
//           }
//         ]
//       },
//       {
//         name: 'Obstacle Dimensions',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'obstaclesdimensionsimages',
//             imageName: 'obstaclesdimensions1'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Attic',
//     isSelected: false,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'Attic Photos',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'atticimages',
//             imageName: 'atticphotos1'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Appliances',
//     isSelected: false,
//     imageModel: [{
//       image: '',
//       imageTitle: '',
//       popupTitle: 'Appliance Name',
//       showPopup: false,
//       popupQuestion: 'Please enter appliance name',
//       questionType: QuestionType.MORE_PHOTOS_WITH_INPUT_STRING,
//       questionOptions: [],
//       givenAnswer: '',
//       formValueToUpdate: '',
//       imageUploadTag: 'appliancesimages',
//       imageName: 'appliances1'
//     }],
//     subMenu: []
//   },
//   {
//     name: 'Details',
//     isSelected: false,
//     imageModel: null,
//     subMenu: null
//   }
// ];

// export const EQUIPMENTS: Equipment[] = [
//   {
//     id: 1,
//     name: 'AC Disconnect',
//     color: '#FEC412',
//     disabledColor: '#fec41280',
//     enabled: true
//   }, {
//     id: 2,
//     name: 'PV Meter',
//     color: '#6AA84F',
//     disabledColor: '#6aa84f80',
//     enabled: true
//   }, {
//     id: 3,
//     name: 'MSP',
//     color: '#FF0000',
//     disabledColor: '#ff000080',
//     enabled: true
//   }, {
//     id: 4,
//     name: 'Inverter',
//     color: '#6D9EEB',
//     disabledColor: '#6d9eeb80',
//     enabled: true
//   }, {
//     id: 5,
//     name: 'Battery',
//     color: '#FF00FF',
//     disabledColor: '#ff00ff80',
//     enabled: true
//   }, {
//     id: 6,
//     name: 'GP',
//     color: '#00FFFF',
//     disabledColor: '#00ffff80',
//     enabled: true
//   }, {
//     id: 7,
//     name: 'Electrical Equipment',
//     color: '#FFFF00',
//     disabledColor: '#ffff0080',
//     enabled: true
//   }
// ];

export class ImageUploadModel {
  key: string;
  imageData: string;
  imagename: string;
}
