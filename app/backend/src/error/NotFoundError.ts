import ErrorBase from './ErrorBase';

export default class NotFound extends ErrorBase {
  constructor(message = 'Not Found Error') {
    super(message);
    this._statusCode = 404;
  }
}
