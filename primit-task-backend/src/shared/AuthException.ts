export class AuthException {
    message: string;
    name: string;
    statusCode: number;
  
    constructor(message: string) {
      this.message = message;
      this.name = "AuthException";
      this.statusCode = 401;
    }
  }
   