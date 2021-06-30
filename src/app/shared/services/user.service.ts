import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdminSaveTO} from '../models/admin-save.model';
import {User} from '../models/user.model';
import {UserPage} from '../models/pagination-model/user-page.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL: string = environment.NZESPORTES_API + 'users/';

  constructor(
    private http: HttpClient
  ) {
  }

  save(adminSaveTO: AdminSaveTO): Observable<AdminSaveTO> {
    const params = new HttpParams().set('async', 'true');
    return this.http.post<AdminSaveTO>(this.apiURL, adminSaveTO, {params});
  }

  update(adminSaveTO: AdminSaveTO): Observable<User> {
    const params = new HttpParams().set('async', 'true');
    return this.http.put<User>(this.apiURL, adminSaveTO, {params});
  }

  getById(idUser: string): Observable<User> {
    const params = new HttpParams().set('async', 'true');
    return this.http.get<User>(this.apiURL + idUser, {params});
  }

  delete(idUser: string): Observable<void> {
    const params = new HttpParams().set('async', 'true');
    return this.http.delete<void>(this.apiURL + idUser, {params});
  }

  getAdmins( size: number, page: number): Observable<UserPage>{
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<UserPage>(this.apiURL, {params});
  }
}
