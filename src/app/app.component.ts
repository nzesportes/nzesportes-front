import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from './shared/services/loader.service';
import {Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'nzesportes-front';
  subscription!: Observable<boolean>;
  isLoading = false;

  constructor(
    private loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.loaderService.isLoading
      .subscribe(res => Promise.resolve(null).then(() => this.isLoading = res));
  }
}
