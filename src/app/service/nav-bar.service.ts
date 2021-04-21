import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  public sidebarState = new BehaviorSubject<boolean>(false);

  constructor() { }

  changeSidebarState(): void {
    this.sidebarState.next(!this.sidebarState.value);
  }
}
