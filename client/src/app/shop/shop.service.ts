import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private readonly baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams): Observable<Pagination> {
    let params = new HttpParams();
    if (shopParams.brandId) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId) {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }
    if (shopParams.pageSize) {
      params = params.append('pageSize', shopParams.pageSize.toString());
    }
    if (shopParams.pageNumber) {
      params = params.append('pageNumber', shopParams.pageNumber.toString());
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    return this.http.get<Pagination>(`${this.baseUrl}products`, { observe: 'response', params })
                    .pipe(
                      map(r => r.body)
                    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands(): Observable<Array<Brand>> {
    return this.http.get<Array<Brand>>(`${this.baseUrl}products/brands`);
  }

  getProductTypes(): Observable<Array<ProductType>> {
    return this.http.get<Array<ProductType>>(`${this.baseUrl}products/types`);
  }
}
