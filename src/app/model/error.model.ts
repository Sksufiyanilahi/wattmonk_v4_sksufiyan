export class ErrorModel {
  statusCode: number;
  error: string;
  message: ErrorMessageList[];
}

export class ErrorMessageList {
  messages: ErrorMessage[];
  status:string;
}

export class ErrorMessage {
  id: string;
  message: string;
}
