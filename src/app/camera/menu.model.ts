export class MenuModel {
  name: string;
  isSelected: boolean;
  imageModel: ImageModel[] = [];
  subMenu: MenuSubModel[] = [];
}

export class MenuSubModel {
  name: string;
  isSelected: boolean;
  images: ImageModel[] = [];
}

export class ImageModel {
  image: string;
  imageTitle: string;
  showPopup: boolean;
  popupQuestion: string;
  questionType: QuestionType;
  questionOptions: string[] = [];
  givenAnswer: string | boolean;
}

export enum QuestionType {
  NONE = 0,
  YES_NO = 1,
  AUTOCOMPLETE = 2,
  RADIO_BUTTON = 3,
  STRING = 4,
  INPUT = 5
}

