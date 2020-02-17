import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('Pasó el interceptor');
    // Deja pasar absolutamente todo, sin verificar nada. Va la request tal cual
    // return next.handle(req);
    // Creación de Headers
    const headers: HttpHeaders = new HttpHeaders()
      .set('token-usuario', 'ABCDEFGHIJKL1234567');
    // Creación de Params
    // Set -> Añade una clave y un valor únicos. Es decir, si lo volvemos a setear otra vez, el
    // valor anterior desaparecerá
    // Append -> Añade un campo al URL con un valor. Aunque se repita luego, el valor anterior
    // no desaparece
    const params: HttpParams = new HttpParams()
      .append('page', '2')
      .set('user', 'Pablo Hermida');
    // Para poder manejar la request y poder añadir los headers o el token tenemos que clonarla,
    // ya que la request que recibimos no se pude usar
    const cloneReq = req.clone({ headers, params });
    return next.handle(cloneReq)
    .pipe(
      catchError(
        (error) => {
          return this.manageError(error);
        }
      )
    );
  }

  manageError(error: HttpErrorResponse): Observable<any> {
    console.log('Ocurrió un error');
    console.warn(error);
    return throwError('Error personalizado');
  }
}
