class CustomError extends Error {
  statusCode: number;
  details: any;
  constructor(message: string, statusCode: number, details: any = {}) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    this.details = details;
    Object.setPrototypeOf(this, CustomError.prototype); // ✅ Ensures proper prototype chain
    // Maintains proper stack trace (only needed for V8/Chrome)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default CustomError;
