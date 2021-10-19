import {Component, OnInit} from '@angular/core';
import {PaginationService} from '../../../../shared/services/pagination.service';
import {Order} from '../../../../shared/enums/order.enum';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  listMyOrders = ['1', '2', '3', '4', '5'];
  content = ['1', '2', '3', '4', '5'];

  constructor(
    public paginationService: PaginationService
  ) {
  }

  ngOnInit(): void {
    this.paginationService.initPagination();
    this.getOrders(10, this.paginationService.page);
  }

  changeStatusCollpse(itemMenu: HTMLElement): void {
    if (itemMenu.className === 'collapse') {
      itemMenu.className = 'collapse show';
    } else if (itemMenu.className === 'collapse show') {
      itemMenu.className = 'collapse';
    }
  }

  getOrders(size: number, page: number): void {
    this.paginationService.getPageRange(this.content.length);
  }

  updateIndex(index: number): void {
    this.getOrders(10, index);
    this.paginationService.page = index;
  }
}
