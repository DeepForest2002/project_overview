export class AppError extends Error {
  statuscode: number;
  constructor(statuscode: number, message: string) {
    super(message);
    this.statuscode = statuscode;
  }
}
