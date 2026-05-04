import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

export const handleHttpError = (error: HttpErrorResponse): Observable<never> => {
  console.error('API Error Trace:', error);
  
  let errorMessage = 'An unknown error occurred!';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Extract backend error message if available, otherwise use status text
    const backendMessage = error.error?.message || error.message || 'Server Error';
    errorMessage = `Error Code: ${error.status}\nMessage: ${backendMessage}`;
  }
  
  return throwError(() => new Error(errorMessage));
};
