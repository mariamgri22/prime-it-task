export class ValidationException {
    status: number;
    message: string;
    errors: any;
  
    constructor(errors: any) {
      this.status = 400;
      this.message = 'validation_exception';
      this.errors = errors;
    }
  }
  