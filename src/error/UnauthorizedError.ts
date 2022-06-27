import ErrorBase from './ErrorBase';

export default class Unauthorized extends ErrorBase {
  constructor(message = 'Unauthorized Error') {
    super(message);
    this._statusCode = 401;
  }
}
