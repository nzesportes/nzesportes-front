import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private store: Store<any>
  ) { }

  addToLocalStorage(): void {
    this.store.subscribe(state => {
      localStorage.setItem('state', JSON.stringify(state));
    });
  }

  getState(): any {
    const state = localStorage.getItem('state');
    if (state === null) {
      return undefined;
    }
    return JSON.parse(state);
  }
}
