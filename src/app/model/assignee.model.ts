export class AssigneeModel {
  name: string;
  image: string;
  id: number;
  selected: boolean;
}

export const LIST_OF_ASSIGNEES: AssigneeModel[] = [
  {
    name: 'Bob',
    image: 'https://img.etimg.com/thumb/width-640,height-480,imgsize-160314,resizemode-1,msid-70396552/why-siddharth-sedani-prefers-sbi-and-bob-to-pnb.jpg',
    id: 1,
    selected: false
  },
  {
    name: 'John',
    image: 'https://img.etimg.com/thumb/width-640,height-480,imgsize-160314,resizemode-1,msid-70396552/why-siddharth-sedani-prefers-sbi-and-bob-to-pnb.jpg',
    id: 2,
    selected: false
  },
  {
    name: 'Ravi',
    image: 'https://img.etimg.com/thumb/width-640,height-480,imgsize-160314,resizemode-1,msid-70396552/why-siddharth-sedani-prefers-sbi-and-bob-to-pnb.jpg',
    id: 3,
    selected: false
  },
  {
    name: 'Nitish',
    image: 'https://img.etimg.com/thumb/width-640,height-480,imgsize-160314,resizemode-1,msid-70396552/why-siddharth-sedani-prefers-sbi-and-bob-to-pnb.jpg',
    id: 4,
    selected: false
  }
];
