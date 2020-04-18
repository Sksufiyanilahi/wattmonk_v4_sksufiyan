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
        images: [
          {
            image: '',
            imageTitle: 'Long Shot',
            showPopup: true,
            popupQuestion: 'MSP',
            questionType: QuestionType.YES_NO,
            questionOptions: ['Inside', 'Outside'],
            givenAnswer: ''
          },
          {
            image: '',
            imageTitle: 'Open Shutter, Zoom Shot',
            showPopup: true,
            popupQuestion: '',
            questionType: QuestionType.AUTOCOMPLETE,
            questionOptions: ['Main_Breakers'],
            givenAnswer: ''
          },
          {
            image: '',
            imageTitle: 'Zoom Shot',
            showPopup: true,
            popupQuestion: 'MSP',
            questionType: QuestionType.AUTOCOMPLETE,
            questionOptions: ['MSP Rating', 'Bus Rating'],
            givenAnswer: ''
          },
          {
            image: '',
            imageTitle: 'Without Cover, Zoom shot',
            showPopup: true,
            popupQuestion: 'Breaker',
            questionType: QuestionType.RADIO_BUTTON,
            questionOptions: ['Top Fed', 'Bottom', 'Center'],
            givenAnswer: ''
          }
        ]
      },
      {
        name: 'PV Meter',
        isSelected: false,
        images: [
          {
            image: '',
            imageTitle: 'Wide angle shot',
            showPopup: true,
            popupQuestion: 'Inverter Location',
            questionType: QuestionType.YES_NO,
            questionOptions: ['Inside', 'Outside'],
            givenAnswer: ''
          },
          {
            image: '',
            imageTitle: 'Zoom shot',
            showPopup: true,
            popupQuestion: 'Inverter manufacture model',
            questionType: QuestionType.STRING,
            questionOptions: [],
            givenAnswer: ''
          }
        ]
      },
      {
        name: 'Utility Meter',
        isSelected: false,
        images: [
          {
            image: '',
            imageTitle: 'Wide angle shot',
            showPopup: true,
            popupQuestion: 'Utility meter',
            questionType: QuestionType.YES_NO,
            questionOptions: ['Attach', 'Detach'],
            givenAnswer: ''
          },
          {
            image: '',
            imageTitle: 'Zoom shot',
            showPopup: true,
            popupQuestion: 'Utility meter name',
            questionType: QuestionType.STRING,
            questionOptions: [],
            givenAnswer: ''
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
        images: [{
          image: '',
          imageTitle: '',
          showPopup: false,
          popupQuestion: '',
          questionType: QuestionType.NONE,
          questionOptions: [],
          givenAnswer: ''
        }]
      },
      {
        name: 'Inverter',
        isSelected: false,
        images: [{
          image: '',
          imageTitle: '',
          showPopup: false,
          popupQuestion: '',
          questionType: QuestionType.NONE,
          questionOptions: [],
          givenAnswer: ''
        }]
      },
      {
        name: 'Obstacles',
        isSelected: false,
        images: [{
          image: '',
          imageTitle: '',
          showPopup: false,
          popupQuestion: '',
          questionType: QuestionType.NONE,
          questionOptions: [],
          givenAnswer: ''
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
      showPopup: false,
      popupQuestion: '',
      questionType: QuestionType.NONE,
      questionOptions: [],
      givenAnswer: ''
    }],
    subMenu: []
  },
  {
    name: 'Appliances',
    isSelected: false,
    imageModel: [{
      image: '',
      imageTitle: '',
      showPopup: false,
      popupQuestion: '',
      questionType: QuestionType.NONE,
      questionOptions: [],
      givenAnswer: ''
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
