import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product, ProductUpdateTO} from '../models/product.model';
import {ProductPage} from '../models/pagination-model/product-page.model';
import {ProductDetails, ProductDetailUpdateTO, Stock} from '../models/product-details.model';
import {UpdateStock} from '../models/update-stock.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api: string = environment.NZESPORTES_API + 'products/';

  constructor(
    private http: HttpClient
  ) {
  }

  create(product: Product): Observable<Product> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.post<Product>(this.api, product, {params});
  }

  update(productUpdateTO: ProductUpdateTO): Observable<ProductUpdateTO> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.put<ProductUpdateTO>(this.api, productUpdateTO, {params});
  }

  updateProductDetails(productDetailTO: ProductDetailUpdateTO): Observable<ProductDetailUpdateTO> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.put<ProductDetailUpdateTO>(this.api + 'details', productDetailTO, {params});
  }

  saveProductDetails(productDetailTO: ProductDetails): Observable<ProductDetails> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.post<ProductDetails>(this.api + 'details', productDetailTO, {params});
  }

  getAll(size: number, page: number,  category?: string, status?: string, name?: string): Observable<ProductPage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString())
      .set('status', status === 'true' ? 'true' : status === 'false' ? 'false' : '')
      .set('category', category ? category : '')
      .set('name', name ? name : '');
    return this.http.get<ProductPage>(this.api, {params});
  }

  getByCategoryId(idCategory: string, size: number, page: number): Observable<ProductPage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ProductPage>(this.api + 'category/' + idCategory, {params});
  }

  getById(id: string): Observable<Product> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<Product>(this.api + id, {params});
  }

  delete(id: string): Observable<Product> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.delete<Product>(this.api + id, {params});
  }

  getDetailById(uuid: string): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(`${this.api}details/${uuid}`);
  }

  updateCategories(idCategory: string, idProduct: string): Observable<Product> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.put<Product>(this.api + idProduct + '/category/' + idCategory, {params});
  }

  updateStock(updateStock: UpdateStock): Observable<Stock> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.put<Stock>(this.api + 'details/stock', updateStock, {params});
  }
}
