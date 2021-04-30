import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Brand} from '../models/brand.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  api: string = environment.NZESPORTES_API + 'products/brands';

  constructor(
    private http: HttpClient
  ) {
  }

  create(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.api + '?async=true', brand);
  }
}
