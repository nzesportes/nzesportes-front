import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Sale} from '../../../shared/models/sale.model';
import {FormGroup} from '@angular/forms';
import {PaginationService} from '../../../shared/services/pagination.service';
import {SalePage} from '../../../shared/models/pagination-model/sale-page.model';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.scss']
})
export class PromotionsListComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;
  content: SalePage | undefined;
  promotions: Sale[] = [];
  hasError!: boolean;
  formPromotions!: FormGroup;


  constructor(
    public paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    const sale: Sale = {
      percentage: 10,
      endDate: new Date(),
      startDate: new Date(),
      quantityLeft: 89,
      id: '123',
      quantity: 100
    };
    this.promotions.push(sale);

  }


  updateIndex(index: number): void {
    // this.getAll(10, index);
    this.paginationService.page = index;
  }


  redirect(): void {

  }

}
