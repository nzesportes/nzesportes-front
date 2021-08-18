import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product, ProductUpdateTO} from '../models/product.model';
import {ProductPage} from '../models/pagination-model/product-page.model';
import {ProductDetails, ProductDetailUpdateTO, Stock} from '../models/product-details.model';
import {UpdateStock} from '../models/update-stock.model';
import {ProductDetailsPage} from '../models/pagination-model/product-details-page.model';
import {Gender} from '../enums/gender';
import {Order} from '../enums/order.enum';
import {DetailsFiltersRequest} from '../../store/models/details-filters-request';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api: string = environment.NZESPORTES_API + 'products/';
  // tslint:disable-next-line:variable-name
  private _detailsFiltersState = new BehaviorSubject<DetailsFiltersRequest>({
    gender: '',
    category: '',
    size: '',
    color: '',
    brand: '',
    classBy: ''
  });

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

  getAll(size: number, page: number, category?: string, status?: string, name?: string): Observable<ProductPage> {
    const urlCategory = category ? '&category=' + category : '';
    const urlStatus = status ? '&status=' + status : '';
    const urlName = name ? '&name=' + name : '';
    return this.http.get<ProductPage>(
      this.api + '?async=true&page=' + page.toString() + '&size=' + size.toString()
      + urlCategory + urlStatus + urlName);
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

  getAllDetails(size: number, page: number, gender?: Gender, category?: string, productSize?: string, color?: string, brand?: string, order?: Order): Observable<ProductDetailsPage> {
    const urlGender = gender ? '&gender=' + gender.toString() : '';
    const urlCategory = category ? '&category=' + category : '';
    const urlProductSize = productSize ? '&productSize=' + productSize : '';
    const urlColor = color ? '&color=' + color : '';
    const urlBrand = brand ? '&brand=' + brand : '';
    const urlOrder = order ? '&order=' + order.toString() : '';
    return this.http.get<ProductDetailsPage>(this.api + 'details?page=' + page.toString() + '&size=' + size.toString()
      + urlGender + urlCategory + urlProductSize + urlColor + urlBrand + urlOrder);
  }

  setDetailsFiltersState(gender?: string, category?: string, size?: string, color?: string, brand?: string, classBy?: string): void {
    const filter: DetailsFiltersRequest = this._detailsFiltersState.getValue();
    filter.gender = gender ? gender : '';
    filter.category = category ? category : '';
    filter.size = size ? size : '';
    filter.color = color ? color : '';
    filter.brand = brand ? brand : '';
    filter.classBy = classBy ? classBy : '';

    this._detailsFiltersState.next(filter);
  }

  get detailsFiltersState(): DetailsFiltersRequest {
    return this._detailsFiltersState.getValue();
  }

  get detailsFiltersState$(): Observable<DetailsFiltersRequest> {
    return this._detailsFiltersState;
  }
}
