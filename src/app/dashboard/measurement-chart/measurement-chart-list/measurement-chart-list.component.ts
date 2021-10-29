import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductPage} from '../../../shared/models/pagination-model/product-page.model';
import {PaginationService} from '../../../shared/services/pagination.service';
import {Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-measurement-chart-list',
  templateUrl: './measurement-chart-list.component.html',
  styleUrls: ['./measurement-chart-list.component.scss']
})
export class MeasurementChartListComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;
  content: ProductPage | undefined;
  hasError!: boolean;
  formMCList!: FormGroup;

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
    this.formMCList = this.formBuilder.group({
      title: ['']
    });
  }

  getAllMeasurementChart(size: number, page: number): void {

  }

  updateIndex(index: number): void {
    this.getAllMeasurementChart(10, index);
    this.paginationService.page = index;
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/tabela-medidas');
  }
}
