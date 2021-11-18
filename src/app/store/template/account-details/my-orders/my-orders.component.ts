import {Component, OnInit} from '@angular/core';
import {PaginationService} from '../../../../shared/services/pagination.service';
import {PurchaseService} from '../../../../shared/services/purchase.service';
import {TokenStorageService} from '../../../../shared/services/token-storage.service';
import {CustomerService} from '../../../../shared/services/customer.service';
import {take} from 'rxjs/operators';
import {Purchase} from '../../../../shared/models/purchase.model';
import {PurchasePage} from '../../../../shared/models/pagination-model/purchase-page.model';
import {ProductsService} from '../../../../shared/services/products.service';
import {PaymentStatusPt} from '../../../../shared/enums/mercado-pago-payment-status.enum';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  listMyOrders = ['1', '2', '3', '4', '5'];
  collapsed = false;
  customerId = '';
  purchases: Purchase[] = [];
  content: PurchasePage | undefined;
  totalPurchase: number[] = [];
  totalItems: number[] = [];
  isMobile = false;
  statusPt = PaymentStatusPt;

  constructor(
    public paginationService: PaginationService,
    private purchaseService: PurchaseService,
    private tokenStorageService: TokenStorageService,
    private customerService: CustomerService,
    private productsService: ProductsService
  ) {
  }

  ngOnInit(): void {
    this.getCustomer();
    this.paginationService.initPagination();
    this.collapsed = false;
    this.isMobile = this.verifyWindowWidth();
  }

  verifyWindowWidth(): boolean {
    return window.innerWidth < 768 ? true : false;
  }

  changeStatusCollpse(itemMenu: HTMLElement): void {
    if (itemMenu.className === 'collapse') {
      itemMenu.className = 'collapse show';
      this.collapsed = true;
    } else if (itemMenu.className === 'collapse show') {
      itemMenu.className = 'collapse';
      this.collapsed = false;
    }
  }

  getCustomer(): void {
    this.customerService.getByUserId(this.tokenStorageService.getSessionUser().id)
      .pipe(take(1))
      .subscribe(response => {
        this.customerId = response.id;
        this.getAllByCustomerId(10, this.paginationService.page, this.customerId);
      }, error => {
        console.error(error);
      });
  }

  getAllByCustomerId(size: number, page: number, customerId: string): void {
    this.purchaseService.getAllByCustomerId(size, page, customerId)
      .pipe(take(1))
      .subscribe(response => {
        this.purchases = response.content;
        this.content = response;
        this.paginationService.getPageRange(this.content.totalElements);
        this.getTotalPurchaseAndItems();
      }, error => {
        console.error(error);
      });
  }

  click(index: number, purchaseId: string): void {
    if (!this.purchases[index].isLoaded) {
      this.getByPurchaseId(index, purchaseId);
    }
  }

  getByPurchaseId(index: number, purchaseId: string): void {
    this.productsService.getByPurchaseId(purchaseId)
      .subscribe(response => {
        this.purchases[index].isLoaded = true;
        this.purchases[index].items.forEach(purchaseItem => {
          const product = response.find(i => i.purchaseStockId === purchaseItem.item.id);
          if (product) {
            purchaseItem.productDetails = product;
          }
        });
      }, error => {
        console.error(error);
      });
  }


  getTotalPurchaseAndItems(): void {
    let purchaseTotal = 0;
    let itemsTotal = 0;
    this.purchases.forEach(purchase => {
      purchaseTotal = 0;
      itemsTotal = 0;
      purchase.items.forEach(item => {
        purchaseTotal += (item.cost * item.quantity);
        itemsTotal += item.quantity;
      });
      this.totalPurchase.push(purchaseTotal);
      this.totalItems.push(itemsTotal);
    });
  }

  updateIndex(index: number): void {
    this.getAllByCustomerId(10, index, this.customerId);
    this.paginationService.page = index;
  }
}
