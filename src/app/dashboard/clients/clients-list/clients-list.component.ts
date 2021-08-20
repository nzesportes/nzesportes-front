import { Component, OnInit } from '@angular/core';
import {Customer} from '../../../shared/models/customer.model';
import {BrandPage} from '../../../shared/models/pagination-model/brand-page.model';
import {CustomerService} from '../../../shared/services/customer.service';
import {PaginationService} from '../../../shared/services/pagination.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  customers: Customer[] = [];
  content: BrandPage | undefined;
  hasError!: boolean;

  constructor(
    private customerService: CustomerService,
    public paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.paginationService.initPagination();
    this.getAllCustomers(10, this.paginationService.page);
  }
  updateIndex(index: number): void {
    this.getAllCustomers(10, index);
    this.paginationService.page = index;
  }

  onChangeFilter(search: string): void {
    this.paginationService.page = 0;
    this.getAllCustomers(10, 0, search);
  }
  getAllCustomers(size: number, page: number, search?: string): void {
    this.customerService.search(size, page, search)
      .pipe(take(1))
      .subscribe(r => {
        this.customers = r.content;
        this.content = r;
        this.paginationService.getPageRange(this.content.totalElements);
      }, () => {
        this.hasError = true;
      });
  }

}
