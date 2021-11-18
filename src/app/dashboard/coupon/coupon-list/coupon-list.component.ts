import {Component, OnInit, ViewChild} from '@angular/core';
import {PaginationService} from '../../../shared/services/pagination.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Coupon} from '../../../shared/models/coupon.model';
import {CouponPage} from '../../../shared/models/pagination-model/coupon-page.model';
import {take} from 'rxjs/operators';
import {CouponService} from '../../../shared/services/coupon.service';

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
    public paginationService: PaginationService,
    private couponService: CouponService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.paginationService.initPagination();
    this.createForm();
    this.getAllCoupons(10, this.paginationService.page);
  }
  private createForm(): void {
    this.formCoupons = this.formBuilder.group({
      code: new FormControl(),
    });
  }

  getAllCoupons(size: number, page: number, code?: string): void {
    this.couponService.getAll(size, page, code)
      .pipe(take(1))
      .subscribe(r => {
        this.coupons = r.content;
        this.content = r;
        this.paginationService.getPageRange(this.content.totalElements);
      }, () => {
        this.hasError = true;
      });
  }
  onChangeFilter(): void {
    this.paginationService.initPagination();
    const code = this.formCoupons.get('code')?.value;
    this.getAllCoupons(10, 0, code);
  }


  updateIndex(index: number): void {
    // this.getAll(10, index);
    this.paginationService.page = index;
  }

  redirect(): void {

  }
}
