import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Sale} from '../../../shared/models/sale.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PaginationService} from '../../../shared/services/pagination.service';
import {SalePage} from '../../../shared/models/pagination-model/sale-page.model';
import {take} from 'rxjs/operators';
import {ProductsService} from '../../../shared/services/products.service';
import {SalesService} from '../../../shared/services/sales.service';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.scss']
})
export class PromotionsListComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;
  content: SalePage | undefined;
  promotions: Sale[] = [];
  hasError!: boolean;
  formPromotions!: FormGroup;
  formCoupons!: FormGroup;


  constructor(
    public paginationService: PaginationService,
    public salesService: SalesService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.paginationService.initPagination();
    this.createForm();
    this.getAllPromotions(10, this.paginationService.page);
  }


  getAllPromotions(size: number, page: number, code?: string): void {
    this.salesService.getAll(size, page, code)
      .pipe(take(1))
      .subscribe(r => {
        this.promotions = r.content;
        this.content = r;
        this.paginationService.getPageRange(this.content.totalElements);
      }, () => {
        this.hasError = true;
      });
  }
  onChangeFilter(): void {
    this.paginationService.initPagination();
    // const code = this.formCoupons.get('code')?.value;
    this.getAllPromotions(10, 0, '');
  }


  updateIndex(index: number): void {
    this.getAllPromotions(10, index);
    this.paginationService.page = index;
  }

  private createForm(): void {
    this.formPromotions = this.formBuilder.group({
      status: new FormControl(),
    });
  }


}
