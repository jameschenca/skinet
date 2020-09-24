import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit
{
  @ViewChild('search', {static: true}) searchterm: ElementRef;
  products: Product[];
  brands: Array<Brand>;
  types: Array<ProductType>;
  brandIdSelected = 0;
  typeIdSelected = 0;
  sortSelected = 'name';
  sortOptions =
  [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];
  shopParams = new ShopParams();
  totalCount: number;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe((response: Pagination) => {
      this.products = response.data;
      this.totalCount = response.count;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
    });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe((response: Array<Brand>) => {
      this.brands = [ {id: 0, name: 'All'}, ...response ];
    });
  }

  getProductTypes(): void {
    this.shopService.getProductTypes().subscribe((response: Array<ProductType>) => {
      this.types = [ {id: 0, name: 'All'}, ...response ];
    });
  }

  onBrandSelected(brandId: number): void {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number): void {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string): void {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(pageNumber: number): void {
    if (this.shopParams.pageNumber !== pageNumber) {
      this.shopParams.pageNumber = pageNumber;
      this.getProducts();
    }
  }

  onsearch(): void {
    this.shopParams.search = this.searchterm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(): void {
    this.searchterm.nativeElement.value = undefined;
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
