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


export const CAMERA_MODULE_MENU: MenuModel[] = [
  {
    name: 'Electricals',
    isSelected: true,
    imageModel: [],
    subMenu: [
      {
        name: 'MSP',
        isSelected: true,
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
            imageUploadTag: 'mspimages'
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
            imageUploadTag: 'mspimages'
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
            imageUploadTag: 'mspimages'
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
            imageUploadTag: 'mspimages'
          }
        ]
      },
      {
        name: 'PV Inverter',
        isSelected: false,
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
          },
          {
            image: '',
            imageTitle: 'Zoom shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Inverter manufacture model',
            questionType: QuestionType.STRING,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'pvinverterimages',
          }
        ]
      },
      {
        name: 'PV Meter',
        isSelected: false,
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
            imageUploadTag: 'pvmeterimages'
          }
        ]
      },
      {
        name: 'AC Disconnect',
        isSelected: false,
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
            imageUploadTag: 'roofimages'
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
            imageUploadTag: 'roofimages'
          }
        ]
      },
      {
        name: 'Utility Meter',
        isSelected: false,
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
            imageUploadTag: 'utilitymeterimages'
          },
          {
            image: '',
            imageTitle: 'Zoom shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Utility Name',
            questionType: QuestionType.STRING,
            questionOptions: [],
            givenAnswer: '',
            formValueToUpdate: '',
            imageUploadTag: 'utilitymeterimages'
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
          imageUploadTag: 'roofimages'
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
      imageUploadTag: 'roofimages'
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
      imageUploadTag: 'roofimages'
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
}
