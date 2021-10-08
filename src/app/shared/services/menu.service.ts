import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from '../models/menu.model';
import {environment} from '../../../environments/environment';
import {LayoutImages} from '../models/layout-images.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  api: string = environment.NZESPORTES_API + 'menu/';

  constructor( private http: HttpClient) { }

  getMenu(): Observable<Menu> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<Menu>(this.api, {params});
  }

  getLayoutImages(): Observable<LayoutImages> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<LayoutImages>(this.api + 'images', {params});
  }

  postImages(layout: LayoutImages): Observable<LayoutImages> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.post<LayoutImages>(this.api + 'images', layout, {params});
  }


}
