import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {PaginationService} from '../../../shared/services/pagination.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;
  content: string[] | undefined;
  hasError!: boolean;
  formOrders!: FormGroup;

  constructor(
    private router: Router,
    public paginationService: PaginationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.paginationService.initPagination();
    this.createForm();
  }

  createForm(): void {
    this.formOrders = this.formBuilder.group({

    });
  }

  getAllOrders(size: number, page: number): void {

  }

  updateIndex(index: number): void {
    this.getAllOrders(10, index);
    this.paginationService.page = index;
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/pedidos');
  }

}
