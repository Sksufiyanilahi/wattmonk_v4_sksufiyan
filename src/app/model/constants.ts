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
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: 'Long Shot',
            popupTitle: 'Confirm',
            showPopup: true,
            popupQuestion: 'MSP Location',
            questionType: QuestionType.YES_NO,
            questionOptions: ['Inside', 'Outside'],
            givenAnswer: '',
            formValueToUpdate: 'msplocation'
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
            formValueToUpdate: 'mainbreakersize'
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
            formValueToUpdate: 'msprating'
          },
          {
            image: '',
            imageTitle: 'Without Cover, Zoom shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Breaker',
            questionType: QuestionType.RADIO_BUTTON,
            questionOptions: ['Top', 'Bottom', 'Center'],
            givenAnswer: '',
            formValueToUpdate: 'mspbreaker'
          }
        ]
      },
      {
        name: 'PV Inverter',
        isSelected: false,
        askBeforeImage: false,
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
            formValueToUpdate: 'pvinverterlocation'
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
            formValueToUpdate: ''
          }
        ]
      },
      {
        name: 'PV Meter',
        isSelected: false,
        askBeforeImage: true,
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
            formValueToUpdate: ''
          }
        ]
      },
      {
        name: 'AC Disconnect',
        isSelected: false,
        askBeforeImage: true,
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
            formValueToUpdate: ''
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
            formValueToUpdate: ''
          }
        ]
      },
      {
        name: 'Utility Meter',
        isSelected: false,
        askBeforeImage: false,
        formControlToUpdate: '',
        images: [
          {
            image: '',
            imageTitle: 'Wide angle shot',
            showPopup: true,
            popupTitle: 'Confirm',
            popupQuestion: 'Utility meter',
            questionType: QuestionType.YES_NO,
            questionOptions: ['Attach', 'Detach'],
            givenAnswer: '',
            formValueToUpdate: 'utilitymeter'
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
            formValueToUpdate: ''
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
          formValueToUpdate: 'numberofmodules'
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
      formValueToUpdate: ''
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
      formValueToUpdate: ''
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
