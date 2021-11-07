import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Coupon} from '../../../shared/models/coupon.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {Sale} from '../../../shared/models/sale.model';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.scss']
})
export class CouponDetailsComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;
  hasError = false;
  id = '';
  coupon: Coupon | undefined;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams.id;
    });

    const coupon: Coupon = {
      discount: 10,
      endDate: new Date(),
      startDate: new Date(),
      quantityLeft: 89,
      id: '123',
      quantity: 100,
      code: 'NOVEMBRO10'
    };
    this.coupon = coupon;
  }


  redirect(): void {

  }

  save(): void {

  }

}
