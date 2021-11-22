import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {PaginationService} from '../../../shared/services/pagination.service';
import {PurchaseService} from '../../../shared/services/purchase.service';
import {take} from 'rxjs/operators';
import {PurchasePage} from '../../../shared/models/pagination-model/purchase-page.model';
import {Purchase} from '../../../shared/models/purchase.model';
import {PaymentStatusPt} from '../../../shared/enums/mercado-pago-payment-status.enum';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;
  content: PurchasePage | undefined;
  purchases: Purchase[] = [];
  hasError!: boolean;
  formOrders!: FormGroup;
  statusPt = PaymentStatusPt;

  constructor(
    private router: Router,
    public paginationService: PaginationService,
    private formBuilder: FormBuilder,
    private purchaseService: PurchaseService
  ) { }

  ngOnInit(): void {
    this.getAll(10, 0, 1);

    this.hasError = false;
    this.paginationService.initPagination();
    this.getAll(10, this.paginationService.page);
    this.createForm();
  }

  createForm(): void {
    this.formOrders = this.formBuilder.group({
      title: ['']
    });
  }

  getAll(size: number, page: number, code?: number): void {
    this.purchaseService.getAll(size, page, code)
      .pipe(take(1))
      .subscribe(response => {
        this.purchases = response.content;
        this.content = response;
        this.paginationService.getPageRange(this.content.totalElements);
        this.hasError = false;
      }, () => {
        this.hasError = true;
      });
  }

  onChangeFilter(): void {
    this.paginationService.initPagination();
    const code = this.formOrders.get('code')?.value;
    this.getAll(10, 0, code);
  }

  updateIndex(index: number): void {
    this.getAll(10, index);
    this.paginationService.page = index;
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/pedidos');
  }

}
