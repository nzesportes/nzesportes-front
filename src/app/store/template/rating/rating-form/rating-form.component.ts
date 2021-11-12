import {Component, OnInit, ViewChild} from '@angular/core';
import {RatingService} from '../../../../shared/services/rating.service';
import {take} from 'rxjs/operators';
import {RatingSaveTO} from '../../../../shared/models/rating-save-to.model';
import {RatingUpdateTO} from '../../../../shared/models/rating-update-to.model';
import {Rating} from '../../../../shared/models/rating.model';
import {RatingPage} from '../../../../shared/models/pagination-model/rating-page.model';
import {PaginationService} from '../../../../shared/services/pagination.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ErrorWarning} from '../../../../shared/models/error-warning.model';
import {ProductsService} from '../../../../shared/services/products.service';
import {Product} from '../../../../shared/models/product.model';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.scss']
})
export class RatingFormComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  createRating!: FormGroup;

  ratingSaveTO: RatingSaveTO = {
    purchaseId: '',
    rate: 0,
    comment: '',
    productId: ''
  };

  ratingUpdateTO: RatingUpdateTO = {
    id: '',
    rate: 0,
    comment: ''
  };

  id = '';
  purchaseId!: string;

  content!: RatingPage;
  ratings: Rating[] = [];
  selectedFilter = '';

  product!: Product;

  constructor(
    private formBuilder: FormBuilder,
    private ratingService: RatingService,
    private paginationService: PaginationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {
  }

  ngOnInit(): void {
    this.getPurchaseIdParam();
    this.getProduct();
    this.createForm();
    this.paginationService.initPagination();
  }

  get validateFields(): any {
    return this.createRating.controls;
  }

  createForm(): void {
    this.createRating = this.formBuilder.group({
      title: ['', Validators.required],
      comment: ['', [Validators.required, Validators.maxLength(500)]],
      rate: ['', Validators.required]
    });
  }

  getProduct(): void {
    this.productService.getById('27ac05ca-7d58-4684-965a-bcf29115fc76')
      .pipe(take(1))
      .subscribe(response => {
        this.product = response;
      });
  }


  create(): void {
    this.ratingSaveTO = this.createRating.value;
    this.ratingSaveTO.purchaseId = this.purchaseId;
    this.ratingSaveTO.productId = this.product.id;
    this.ratingService.create(this.ratingSaveTO)
      .pipe(take(1))
      .subscribe(response => {
        this.dialogSuccess.title = 'Avaliação enviada com sucesso!';
        this.createRating.reset();
        this.dialogSuccess.fire();
      }, (error: ErrorWarning) => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.create();
          }
        });
      });
  }

  getPurchaseIdParam(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.purchaseId = urlParams.id;
      this.getRatingsByPurchaseId();
    });
  }

  getRatingsByPurchaseId(): void {
    this.ratingService.getRatingsByPurchaseId(this.purchaseId, 0, 100)
      .pipe(take(1))
      .subscribe(response => {
      }, error => {
        console.error(error);
      });
  }

  update(): void {

  }

  redirect(): void {
    this.router.navigateByUrl('/');
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }

  filterSelected(filter: string): void {
    this.selectedFilter = filter;
  }
}
