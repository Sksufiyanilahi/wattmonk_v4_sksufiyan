export class MenuModel {
  name: string;
  isSelected: boolean;
  imageModel: ImageModel[] = [];
  subMenu: MenuSubModel[] = [];
}

export class MenuSubModel {
  name: string;
  allCaptured: boolean;
  isSelected: boolean;
  askBeforeImage: boolean;
  answered: boolean;
  questionToAsk: string;
  formControlToUpdate: string;
  images: ImageModel[] = [];
}

export class ImageModel {
  image: string;
  imageTitle: string;
  popupTitle: string;
  showPopup: boolean;
  popupQuestion: string;
  imageUploadTag: string;
  questionType: QuestionType;
  questionOptions: string[] = [];
  givenAnswer: string | boolean;
  formValueToUpdate: string;
}

export enum QuestionType {
  NONE = 0,
  YES_NO = 1,
  RADIO_BUTTON = 2,
  STRING = 3,
  INPUT_NUMBER = 4,
  INVERTER_MODEL = 5,
  UTILITIES = 6,
  MORE_PHOTOS = 7
}

