export class MenuModel {
  name: string;
  isSelected: boolean;
  surveyCompleted: boolean;
  subMenu: MenuModel[] = [];
}
