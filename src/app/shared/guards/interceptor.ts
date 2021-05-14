import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {TokenStorageService} from '../services/token-storage.service';
import {LoaderService} from '../services/loader.service';
import {AbstractService} from '../services/abstract.service';

@Injectable()
export class Interceptor extends AbstractService implements HttpInterceptor {

  constructor(private auth: AuthService, private tokenStorageService: TokenStorageService, private loader: LoaderService) {
    super();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.NZESPORTES_API)) {
      let request = req.clone({
        setHeaders: {
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Methods': 'GET, POST',
          Authorization: `Bearer ${this.tokenStorageService.getToken()}`,
        },
      });

      if (req.urlWithParams.includes('?async=true')) {
        this.loader.isLoading.next(true);
        request = request.clone({
          params: request.params.delete('async')
        });
      }
      // @ts-ignore
      return next.handle(request).pipe(
        tap((ev: HttpEvent<any>) => {
            if (ev instanceof HttpResponse) {
              if (this.loader.isLoading.value) {
                this.loader.isLoading.next(false);
              }
            }
          },
          () => {
            if (this.loader.isLoading.value) {
              this.loader.isLoading.next(false);
            }
          }),
        catchError(this.parserErrorResponse)
      );
    } else {
      const request = req.clone({});
      // @ts-ignore
      return next.handle(request).pipe(
        tap((ev: HttpEvent<any>) => {
            if (ev instanceof HttpResponse) {
              if (this.loader.isLoading.value) {
                this.loader.isLoading.next(false);
              }
            }
          },
          () => {
            if (this.loader.isLoading.value) {
              this.loader.isLoading.next(false);
            }
          }),
        catchError(this.parserErrorResponse)
      );
    }

  }
}
