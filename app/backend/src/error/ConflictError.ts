import ErrorBase from './ErrorBase';

export default class ConflictError extends ErrorBase {
  constructor(message = 'Conflict Error') {
    super(message);
    this._statusCode = 409;
  }
}
