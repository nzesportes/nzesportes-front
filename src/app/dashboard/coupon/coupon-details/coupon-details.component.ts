import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Coupon} from '../../../shared/models/coupon.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CouponService} from '../../../shared/services/coupon.service';
import {map, take} from 'rxjs/operators';
import {Brand} from '../../../shared/models/brand.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorWarning} from '../../../shared/models/error-warning.model';

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
  coupon!: Coupon;
  loaded = true;

  public formBrand: FormGroup = new FormGroup({});
  constructor(
    private activatedRoute: ActivatedRoute,
    private couponService: CouponService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.loaded = false;
    if (this.router.url.includes('cupons/detalhes')) {
      this.route.params.pipe(
        map(p => p.id)
      ).subscribe(id => {
        this.couponService.getById(id)
          .pipe(take(1))
          .subscribe((c: Coupon) => {
            this.coupon = c;
            this.loaded = true;
            console.log('entrou');
            this.createForm();
          }, () => {
            this.hasError = true;
          });
      });
    }else{
      this.loaded = true;
      this.createForm();
    }
  }

  formField(valueForm: any): FormControl {
    return new FormControl({value: valueForm, disabled: this.coupon ? false : true}, Validators.required );
  }
  disabled(): boolean {
    return (this.router.url.includes('cupons/detalhes') && this.coupon) ? true : false;
  }

  private createForm(): void {
    this.formBrand = this.formBuilder.group({
      id: new FormControl(this.coupon?.id ? this.coupon.id : null),
      code: new FormControl( this.coupon?.code ? this.coupon.code : '', Validators.required ),
      quantity: new FormControl(this.coupon?.quantity ? this.coupon.quantity : '', Validators.required),
      endDate: new FormControl(this.coupon?.endDate ? this.coupon.endDate : '', Validators.required),
      discount: new FormControl(this.coupon?.discount ? this.coupon.discount : '', Validators.required),
      startDate: new FormControl(this.coupon?.startDate ? this.coupon.startDate : '', Validators.required),
      status: new FormControl(this.coupon?.status ? this.coupon.status : '', Validators.required),
    });
    if (this.coupon && this.coupon.id){
      // @ts-ignore
      this.formBrand.get('code').disable();
      // @ts-ignore
      this.formBrand.get('quantity').disable();
      // @ts-ignore
      this.formBrand.get('discount').disable();
      // @ts-ignore
      this.formBrand.get('discount').disable();
      // @ts-ignore
      this.formBrand.get('startDate').disable();
      // @ts-ignore
      this.formBrand.get('endDate').disable();
    }
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.errors && field.touched
    };
  }

  save(): void {
    if (this.coupon){
      this.coupon.status = this.formBrand.value.status;
    }
    const request = this.coupon ?
      this.couponService.update(this.coupon) :
      this.couponService.create(this.formBrand.value);
    request
      .pipe(take(1))
      .subscribe(() => {
        this.dialogSuccess.title = 'Marca salva com sucesso!';
        this.dialogSuccess.fire();
      }, (error: ErrorWarning) => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.save();
          }
        });
      });
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/cupons');
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }

}
