import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

export const handleHttpError = (error: HttpErrorResponse): Observable<never> => {
  console.error('API Error Trace:', error);

  let errorMessage = 'An unknown error occurred!';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Error: ${error.error.message}`;
  } else {
    errorMessage = error.error?.message || error.message || 'Server Error';
    
    if (error.error?.errors) {
      if (Array.isArray(error.error.errors)) {
        const details = error.error.errors.map((e: any) => e.msg || e.message || JSON.stringify(e)).join(', ');
        errorMessage += ` - ${details}`;
      } else if (typeof error.error.errors === 'object') {
        errorMessage += ` - ${JSON.stringify(error.error.errors)}`;
      }
    }
  }

  return throwError(() => new Error(errorMessage));
};
