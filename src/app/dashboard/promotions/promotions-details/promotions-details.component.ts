import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Sale} from '../../../shared/models/sale.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-promotions-details',
  templateUrl: './promotions-details.component.html',
  styleUrls: ['./promotions-details.component.scss']
})
export class PromotionsDetailsComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;
  hasError = false;
  id = '';
  promotion: Sale | undefined;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams.id;
    });

    const sale: Sale = {
      percentage: 10,
      endDate: new Date(),
      startDate: new Date(),
      quantityLeft: 89,
      id: '123',
      quantity: 100
    };
    this.promotion = sale;
  }


  redirect(): void {

  }

  save(): void {

  }

}
