import {Component, OnInit, ViewChild} from '@angular/core';
import {PaginationService} from '../../../shared/services/pagination.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormGroup} from '@angular/forms';
import {Coupon} from '../../../shared/models/coupon.model';
import {CouponPage} from '../../../shared/models/pagination-model/coupon-page.model';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;
  hasError!: boolean;
  content: CouponPage | undefined;
  coupons: Coupon[] = [];
  formCoupons!: FormGroup;

  constructor(
    public paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    const coupon: Coupon = {
      discount: 10,
      endDate: new Date(),
      startDate: new Date(),
      quantityLeft: 89,
      id: '123',
      quantity: 100,
      code: 'NOVEMBRO10'
    };
    this.coupons.push(coupon);
  }


  updateIndex(index: number): void {
    // this.getAll(10, index);
    this.paginationService.page = index;
  }

  redirect(): void {

  }

}
