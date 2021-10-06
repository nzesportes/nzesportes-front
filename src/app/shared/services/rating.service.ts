import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RatingSaveTO} from '../models/rating-save-to.model';
import {Observable} from 'rxjs';
import {Rating} from '../models/rating.model';
import {RatingUpdateTO} from '../models/rating-update-to.model';
import {RatingPage} from '../models/pagination-model/rating-page.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  apiURL: string = environment.NZESPORTES_API + 'ratings';

  constructor(
    private http: HttpClient
  ) { }

  create(ratingSaveTO: RatingSaveTO): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiURL}`, ratingSaveTO);
  }

  update(ratingUpdateTO: RatingUpdateTO): Observable<Rating> {
    return this.http.put<Rating>(`${this.apiURL}`, ratingUpdateTO);
  }

  getRatings(page: number, size: number): Observable<RatingPage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<RatingPage>(`${this.apiURL}`, {params});
  }

  getRatingById(id: string): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiURL}/${id}`);
  }

  getAllRatings(page: number, size: number): Observable<RatingPage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<RatingPage>(`${this.apiURL}/user`, {params});
  }

  getRatingsByProductId(id: string, page: number, size: number): Observable<RatingPage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<RatingPage>(`${this.apiURL}/product/${id}`, {params});
  }

  deleteById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }


}
