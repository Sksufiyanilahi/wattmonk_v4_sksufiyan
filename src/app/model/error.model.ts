export class ErrorModel {
  statusCode: number;
  error: string;
  message: ErrorMessageList[];
}

export class ErrorMessageList{
  messages: ErrorMessage[];
}

export class ErrorMessage {
  id: string;
  message: string;
}
