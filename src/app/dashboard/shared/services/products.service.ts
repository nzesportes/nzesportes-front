import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api: string = environment.NZESPORTES_API + 'products/';

  constructor(
    private http: HttpClient
  ) { }
}
