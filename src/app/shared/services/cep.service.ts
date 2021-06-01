import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(
    private http: HttpClient
  ) { }

  findByCep(cep: string): any {
    if (cep !== null) {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
      }
    }
    return of({});
  }
}
