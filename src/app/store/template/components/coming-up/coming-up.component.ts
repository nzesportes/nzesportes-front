import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../../shared/services/products.service';
import {map, take} from 'rxjs/operators';
import {Product} from '../../../../shared/models/product.model';
import {ProductsStore} from '../../../../shared/models/products-store.model';
import {Brand} from '../../../../shared/models/brand.model';
import {Sale} from '../../../../shared/models/sale.model';
import {Gender} from '../../../../shared/enums/gender';
import {Router} from '@angular/router';

@Component({
  selector: 'app-coming-up',
  templateUrl: './coming-up.component.html',
  styleUrls: ['./coming-up.component.scss']
})
export class ComingUpComponent implements OnInit {

  // @ts-ignore
  products: Product[];
// @ts-ignore
  productsStore: ProductsStore[];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.productsService.getAll(8, 0)
      .pipe(
        take(1),
        map(productsStore => {
          const result: ProductsStore[] = [];
          productsStore.content.forEach(p => {
            p.productDetails.forEach(pd => {
              const productStore = {
                id: p.id,
                // description: p.description,
                model: p.model,

                idProductDetails: pd.id,
                color: pd.color,
                size: pd.size,
                price: pd.price,
                brand: p.brand,
                sale: pd.sale,
                gender: pd.gender,
                status: pd.status
              };
              result.push(productStore);
            });
          });
          return result;
        })
      )
      .subscribe(products => {
        this.productsStore = products;
      });
  }

  goToProductDetails(idProductDetails: string, id: string): void {
    this.productsService.getById(id)
      .pipe(take(1))
      .subscribe(product => {
        localStorage.setItem('product', JSON.stringify(product));
      });
    this.router.navigateByUrl('/produtos/' + idProductDetails);
  }
}
