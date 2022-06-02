class ErrorBase extends Error {
  protected _statusCode: number;

  constructor(message: string) {
    super(message);
    this._statusCode = 0;
  }
}

export default ErrorBase;
