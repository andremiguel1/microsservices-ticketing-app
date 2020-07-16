import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error'

export class RequestValidationError extends CustomError {

    statusCode = 400;

    constructor(public errors: ValidationError[]){
        super('Invelid request parammeters');

        //Only because we are extending a built in classs
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }


    serializeErrors(){
        return this.errors.map(err => {
            return {
                message: err.msg, 
                field: err.param
            }
        });
    }
}