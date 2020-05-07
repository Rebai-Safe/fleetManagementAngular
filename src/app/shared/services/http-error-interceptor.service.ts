import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

/*HttpInterceptor is an interface that can be implemented by a class and it has only one method 
that intercepts an outgoing HttpRequest and optionally transform it or the response. 
That method called intercept. */

export class HttpErrorInterceptorService implements HttpInterceptor{
  
  
  intercept( req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
  
  
    return next.handle(req).pipe(
      tap( evt => {
        if (evt instanceof HttpResponse) {
            if(evt.body && evt.body.success)
                this.toasterService.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
        }
    }),
     
      catchError((err: any) => {
          if(err instanceof HttpErrorResponse) {
              this.toasterService.error("Erreur Serveur","",{ positionClass: 'toast-center-center' });
                console.log(err);
            }
         
         
         
          return of(err);
      }));

}

  




 
  constructor(public toasterService: ToastrService) { }
}
