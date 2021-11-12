import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PurchaseService} from '../../../shared/services/purchase.service';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Purchase} from '../../../shared/models/purchase.model';
import {ProductsService} from '../../../shared/services/products.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;
  hasError = false;
  id = '';
  purchase!: Purchase;
  totalPurchase = 0;

  constructor(
    private router: Router,
    private purchaseService: PurchaseService,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {
  }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams.id;
      this.getById();
    });
  }

  getById(): void {
    this.purchaseService.getById(this.id)
      .pipe(take(1))
      .subscribe(response => {
        this.purchase = response;
        this.hasError = false;
        this.getTotalPurchase();
        this.getByPurchaseId(this.purchase.id);
      }, () => {
        this.hasError = true;
      });
  }

  getTotalPurchase(): void {
    this.purchase?.items.forEach(item => {
      this.totalPurchase += (item.cost * item.quantity);
    });
  }

  getByPurchaseId(purchaseId: string): void {
    this.productsService.getByPurchaseId(purchaseId)
      .subscribe(response => {
        this.purchase.items.forEach(purchaseItem => {
          const product = response.find(i => i.purchaseStockId === purchaseItem.item.id);
          if (product) {
            purchaseItem.productDetails = product;
          }
        });
      }, error => {
        console.error(error);
      });
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/pedidos');
  }

  isMobile(): any {
    const userAgent = window.navigator.userAgent.toLocaleLowerCase();
    return userAgent.includes('iphone') || userAgent.includes('android');
  }

}
