import ErrorBase from './ErrorBase';

export default class BadRequestError extends ErrorBase {
  constructor(message = 'Bad Request Error') {
    super(message);
    this._statusCode = 400;
  }
}
