import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class HttpErrorService {

  constructor() {
  }

  // Http Error Response Function
  httpErrorHandler(err: HttpErrorResponse) {
    let errorMessage = '';

    // This validation for Unknown Error
    if(!err.error || !err.error.error || err.error.status === 500){
      errorMessage = "There is some Unknown Error Occurred, Please try again after some time";
    }

    // this validation for Conflict and Status Code will be 409
    if(err.error.error === 'Conflict' && err.error.status === 409){
      errorMessage = err.error.message;
    }

    // this validation for Unprocessable Entity and Status Code will be 422
    if(err.error.error === 'Unprocessable Entity' && err.error.status === 422){
      errorMessage = err.error.message;
    }

    // this validation for Bad Request and Status Code will be 400
    if(err.error.error === 'Bad Request' && err.error.status === 400){
      errorMessage = err.error.message;
    }

    return errorMessage;
  }
}



