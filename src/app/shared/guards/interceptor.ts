import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {TokenStorageService} from '../services/token-storage.service';
import {LoaderService} from '../services/loader.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private tokenStorageService: TokenStorageService, private loader: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.NZESPORTES_API)) {
      if (req.url.includes('?async=true')) {
        this.loader.isLoading.next(true);
        req.url.replace('?async=true', '');
      }
      const request = req.clone({
        setHeaders: {
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Methods': 'GET, POST',
          Authorization: `Bearer ${this.tokenStorageService.getToken()}`,
        },
      });
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
          })
      );
    } else {
      const request = req.clone({});
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
          })
      );
    }

  }
}
