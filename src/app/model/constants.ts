import { MenuModel, QuestionType } from '../camera/menu.model';

export enum ScheduleFormEvent {
  NO_EVENT = 0,
  SAVE_DESIGN_FORM = 1,
  SAVE_SURVEY_FORM = 2,
  START_SURVEY = 3
}

export enum UserRoles {
  ADMIN = 5,
  BD = 3,
  DESIGNER = 8,
  SURVEYOR = 9,
  ANALYST = 10
}

export const INVALID_EMAIL_MESSAGE = 'Invalid Email';
export const FIELD_REQUIRED = 'This field is required';

export const COMET_CHAT_APP_ID = '190385dcec51285';
export const COMET_CHAT_AUTH_KEY = '5cafae1939d4fc620698c50ae3f25e727fc90213';
export const COMET_CHAT_REGION = 'us';


export const CAMERA_MODULE_MENU_BATTERY: MenuModel[] = [
  {
    name: 'Electricals',
    isSelected: true,
    imageModel: [],
    subMenu: [
      {
        name: 'MSP',
        isSelected: true,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: 'Long Shot',
            popupTitle: 'Confirm',
            showPopup: true,
            popupQuestion: 'Is MSP location inside or outside of building?',
            questionType: QuestionType.YES_NO,
            questionOptions: ['Inside', 'Outside'],
            givenAnswer: '',
            formValueToUpdate: 'msplocation',
            imageUploadTag: 'mspimages',
            imageName: 'msplongshot'
          },
          {
            image: '',
            imageTitle: 'Open Shutter, Zoom Shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Main Breaker Size',
            questionType: QuestionType.INPUT_NUMBER,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: 'mainbreakersize',
            imageUploadTag: 'mspimages',
            imageName: 'mspopenshutterzoomshot'
          },
          {
            image: '',
            imageTitle: 'Zoom Shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'MSP Rating',
            questionType: QuestionType.INPUT_NUMBER,
            questionOptions: ['MSP Rating', 'Bus Rating'],
            givenAnswer: '',
            formValueToUpdate: 'msprating',
            imageUploadTag: 'mspimages',
            imageName: 'mspzoomshot'
          },
          {
            image: '',
            imageTitle: 'Without Cover, Zoom shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Main breaker location in MSP',
            questionType: QuestionType.RADIO_BUTTON,
            questionOptions: ['Top', 'Bottom', 'Center'],
            givenAnswer: '',
            formValueToUpdate: 'mspbreaker',
            imageUploadTag: 'mspimages',
            imageName: 'mspwithoutcovershot'
          }
        ]
      },
      {
        name: 'PV Inverter',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: 'Wide angle shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Inverter Location',
            questionType: QuestionType.YES_NO,
            questionOptions: ['Inside', 'Outside'],
            givenAnswer: '',
            formValueToUpdate: 'pvinverterlocation',
            imageUploadTag: 'pvinverterimages',
            imageName: 'pvinverterwideshoturl'
          },
          {
            image: '',
            imageTitle: 'Zoom shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Inverter manufacture model',
            questionType: QuestionType.INVERTER_MODEL,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'pvinverterimages',
            imageName: 'pvinverterzoomshoturl'
          }
        ]
      },
      {
        name: 'PV Meter',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: true,
        answered: false,
        questionToAsk: 'Is PV meter installed in premises',
        formControlToUpdate: 'pvmeter',
        images: [
          {
            image: '',
            imageTitle: 'PV Meter',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Inverter Location',
            questionType: QuestionType.NONE,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'pvmeterimages',
            imageName: 'pvmeterwideshoturl'
          }
        ]
      },
      {
        name: 'AC Disconnect',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: true,
        answered: false,
        questionToAsk: 'Is AC disconnected?',
        formControlToUpdate: 'acdisconnect',
        images: [
          {
            image: '',
            imageTitle: 'Wide Angle Shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Inverter Location',
            questionType: QuestionType.NONE,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'acdisconnectimages',
            imageName: 'acdisconnectwideshoturl'
          },
          {
            image: '',
            imageTitle: 'Zoom Shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Inverter Location',
            questionType: QuestionType.NONE,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'acdisconnectimages',
            imageName: 'acdisconnectzoomshoturl'
          }
        ]
      },
      {
        name: 'Utility Meter',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: 'Wide angle shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Is Utility meter is attached or detached with MSP?',
            questionType: QuestionType.YES_NO,
            questionOptions: ['Attach', 'Detach'],
            givenAnswer: '',
            formValueToUpdate: 'utilitymeter',
            imageUploadTag: 'utilitymeterimages',
            imageName: 'umwideshoturl'
          },
          {
            image: '',
            imageTitle: 'Zoom shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Utility Name',
            questionType: QuestionType.UTILITIES,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'utilitymeterimages',
            imageName: 'umzoomshoturl'
          }
        ]
      }
    ]
  },
  {
    name: 'Solar',
    isSelected: false,
    imageModel: [],
    subMenu: [
      {
        name: 'Panels',
        isSelected: true,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [{
          image: '',
          imageTitle: 'Wide angle shot',
          showPopup: false,
          popupTitle: 'Confirm',
          popupQuestion: 'Number of Modules',
          questionType: QuestionType.INPUT_NUMBER,
          questionOptions: [],
          givenAnswer: '',
          formValueToUpdate: 'numberofmodules',
          imageUploadTag: 'roofimages',
          imageName: 'solarpanels'
        }]
      }
    ]
  },
  {
    name: 'Roof',
    isSelected: false,
    imageModel: [{
      image: '',
      imageTitle: '',
      popupTitle: 'Confirm',
      showPopup: false,
      popupQuestion: '',
      questionType: QuestionType.NONE,
      questionOptions: [],
      givenAnswer: '',
      formValueToUpdate: '',
      imageUploadTag: 'roofimages',
      imageName: 'roofimages'
    }],
    subMenu: []
  },
  {
    name: 'Appliances',
    isSelected: false,
    imageModel: [{
      image: '',
      imageTitle: '',
      popupTitle: 'Confirm',
      showPopup: false,
      popupQuestion: '',
      questionType: QuestionType.NONE,
      questionOptions: [],
      givenAnswer: '',
      formValueToUpdate: '',
      imageUploadTag: 'appliancesimages',
      imageName: 'appliances'
    }],
    subMenu: []
  },
  {
    name: 'Details',
    isSelected: false,
    imageModel: null,
    subMenu: null
  }
];

export const CAMERA_MODULE_MENU_PV: MenuModel[] = [
  {
    name: 'Electricals',
    isSelected: true,
    imageModel: [],
    subMenu: [
      {
        name: 'MSP',
        isSelected: true,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: 'Long Shot',
            popupTitle: 'Confirm',
            showPopup: true,
            popupQuestion: 'Is MSP location inside or outside of building?',
            questionType: QuestionType.YES_NO,
            questionOptions: ['Inside', 'Outside'],
            givenAnswer: '',
            formValueToUpdate: 'msplocation',
            imageUploadTag: 'mspimages',
            imageName: 'msplongshot'
          },
          {
            image: '',
            imageTitle: 'Open Shutter, Zoom Shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Main Breaker Size',
            questionType: QuestionType.INPUT_NUMBER,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: 'mainbreakersize',
            imageUploadTag: 'mspimages',
            imageName: 'mspopenshutterzoomshot'
          },
          {
            image: '',
            imageTitle: 'Zoom Shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'MSP Rating',
            questionType: QuestionType.INPUT_NUMBER,
            questionOptions: ['MSP Rating', 'Bus Rating'],
            givenAnswer: '',
            formValueToUpdate: 'msprating',
            imageUploadTag: 'mspimages',
            imageName: 'mspzoomshot'
          },
          {
            image: '',
            imageTitle: 'Without Cover, Zoom shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Main breaker location in MSP',
            questionType: QuestionType.RADIO_BUTTON,
            questionOptions: ['Top', 'Bottom', 'Center'],
            givenAnswer: '',
            formValueToUpdate: 'mspbreaker',
            imageUploadTag: 'mspimages',
            imageName: 'mspwithoutcovershot'
          }
        ]
      },
      {
        name: 'Existing Sub Panel',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.NONE,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'existingsubpanelimages',
            imageName: 'Existingsubpanelimages'
          }
        ]
      },
      {
        name: 'Utility Meter',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: 'Wide angle shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Is Utility meter is attached or detached with MSP?',
            questionType: QuestionType.YES_NO,
            questionOptions: ['Attach', 'Detach'],
            givenAnswer: '',
            formValueToUpdate: 'utilitymeter',
            imageUploadTag: 'utilitymeterimages',
            imageName: 'umwideshoturl'
          },
          {
            image: '',
            imageTitle: 'Zoom shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Utility Name',
            questionType: QuestionType.UTILITIES,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'utilitymeterimages',
            imageName: 'umzoomshoturl'
          }
        ]
      }
    ]
  },
  {
    name: 'Roof',
    isSelected: false,
    imageModel: [],
    subMenu: [
      {
        name: 'Roof Photos',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.MORE_PHOTOS,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'roofimages',
            imageName: 'roofphotos'
          }
        ]
      },
      {
        name: 'Roof Dimensions',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.MORE_PHOTOS,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'roofdimensionimages',
            imageName: 'roofdimensions'
          }
        ]
      },
      {
        name: 'Obstacle Photos',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.MORE_PHOTOS,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'obstaclesimages',
            imageName: 'obstaclesphotos'
          }
        ]
      },
      {
        name: 'Obstacle Dimensions',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.MORE_PHOTOS,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'obstaclesdimensionsimages',
            imageName: 'obstaclesdimensions'
          }
        ]
      }
    ]
  },
  {
    name: 'Attic',
    isSelected: false,
    imageModel: [],
    subMenu: [
      {
        name: 'Attic Photos',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.MORE_PHOTOS,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'atticimages',
            imageName: 'atticphotos'
          }
        ]
      }
    ]
  },
  {
    name: 'Appliances',
    isSelected: false,
    imageModel: [{
      image: '',
      imageTitle: '',
      popupTitle: 'Confirm',
      showPopup: false,
      popupQuestion: '',
      questionType: QuestionType.NONE,
      questionOptions: [],
      givenAnswer: '',
      formValueToUpdate: '',
      imageUploadTag: 'appliancesimages',
      imageName: 'appliances'
    }],
    subMenu: []
  },
  {
    name: 'Details',
    isSelected: false,
    imageModel: null,
    subMenu: null
  }
];

export const CAMERA_MODULE_MENU_PV_BATTERY: MenuModel[] = [
  {
    name: 'Electricals',
    isSelected: true,
    imageModel: [],
    subMenu: [
      {
        name: 'MSP',
        isSelected: true,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: 'Long Shot',
            popupTitle: 'Confirm',
            showPopup: true,
            popupQuestion: 'Is MSP location inside or outside of building?',
            questionType: QuestionType.YES_NO,
            questionOptions: ['Inside', 'Outside'],
            givenAnswer: '',
            formValueToUpdate: 'msplocation',
            imageUploadTag: 'mspimages',
            imageName: 'msplongshot'
          },
          {
            image: '',
            imageTitle: 'Open Shutter, Zoom Shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Main Breaker Size',
            questionType: QuestionType.INPUT_NUMBER,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: 'mainbreakersize',
            imageUploadTag: 'mspimages',
            imageName: 'mspopenshutterzoomshot'
          },
          {
            image: '',
            imageTitle: 'Zoom Shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'MSP Rating',
            questionType: QuestionType.INPUT_NUMBER,
            questionOptions: ['MSP Rating', 'Bus Rating'],
            givenAnswer: '',
            formValueToUpdate: 'msprating',
            imageUploadTag: 'mspimages',
            imageName: 'mspzoomshot'
          },
          {
            image: '',
            imageTitle: 'Without Cover, Zoom shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Main breaker location in MSP',
            questionType: QuestionType.RADIO_BUTTON,
            questionOptions: ['Top', 'Bottom', 'Center'],
            givenAnswer: '',
            formValueToUpdate: 'mspbreaker',
            imageUploadTag: 'mspimages',
            imageName: 'mspwithoutcovershot'
          }
        ]
      },
      {
        name: 'Existing Sub Panel',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.NONE,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'existingsubpanelimages',
            imageName: 'existingsubpanelimages'
          }
        ]
      },
      {
        name: 'Location of Battery',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.NONE,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'roofimages',
            imageName: 'locationofbattery'
          }
        ]
      },
      {
        name: 'Utility Meter',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: 'Wide angle shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Is Utility meter is attached or detached with MSP?',
            questionType: QuestionType.YES_NO,
            questionOptions: ['Attach', 'Detach'],
            givenAnswer: '',
            formValueToUpdate: 'utilitymeter',
            imageUploadTag: 'utilitymeterimages',
            imageName: 'umwideshoturl'
          },
          {
            image: '',
            imageTitle: 'Zoom shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Utility Name',
            questionType: QuestionType.UTILITIES,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'utilitymeterimages',
            imageName: 'umzoomshoturl'
          }
        ]
      }
    ]
  },
  {
    name: 'Roof',
    isSelected: false,
    imageModel: [],
    subMenu: [
      {
        name: 'Roof Photos',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.MORE_PHOTOS,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'roofimages',
            imageName: 'roofimage'
          }
        ]
      },
      {
        name: 'Roof Dimensions',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.MORE_PHOTOS,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'roofdimensionimages',
            imageName: 'roofdimensions'
          }
        ]
      },
      {
        name: 'Obstacle Photos',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.MORE_PHOTOS,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'obstaclesimages',
            imageName: 'obstaclephotos'
          }
        ]
      },
      {
        name: 'Obstacle Dimensions',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.MORE_PHOTOS,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'obstaclesdimensionsimages',
            imageName: 'obstaclesdimensions'
          }
        ]
      }
    ]
  },
  {
    name: 'Attic',
    isSelected: false,
    imageModel: [],
    subMenu: [
      {
        name: 'Attic Photos',
        isSelected: false,
        allCaptured: false,
        askBeforeImage: false,
        answered: false,
        questionToAsk: '',
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: '',
            showPopup: true,
            popupTitle: '',
            popupQuestion: '',
            questionType: QuestionType.MORE_PHOTOS,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'atticimages',
            imageName: 'atticphotos'
          }
        ]
      }
    ]
  },
  {
    name: 'Appliances',
    isSelected: false,
    imageModel: [{
      image: '',
      imageTitle: '',
      popupTitle: 'Confirm',
      showPopup: false,
      popupQuestion: '',
      questionType: QuestionType.NONE,
      questionOptions: [],
      givenAnswer: '',
      formValueToUpdate: '',
      imageUploadTag: 'appliancesimages',
      imageName: 'appliances'
    }],
    subMenu: []
  },
  {
    name: 'Details',
    isSelected: false,
    imageModel: null,
    subMenu: null
  }
];

export class ImageUploadModel {
  key: string;
  imageData: string;
  imagename: string;
}
