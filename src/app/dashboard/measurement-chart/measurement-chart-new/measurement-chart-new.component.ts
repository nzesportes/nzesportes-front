import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Stock} from '../../../shared/models/product-details.model';

@Component({
  selector: 'app-measurement-chart-new',
  templateUrl: './measurement-chart-new.component.html',
  styleUrls: ['./measurement-chart-new.component.scss']
})
export class MeasurementChartNewComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;
  formMCNew!: FormGroup;
  hasError = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formMCNew = this.formBuilder.group({
      header: ['']
    });
  }

  save(): void {

  }

  get validateFields(): any {
    return this.formMCNew.controls;
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/categorias');
  }

  get measurementChartNew(): FormArray {
    return this.formMCNew.get('header') as FormArray;
  }

  addHeader(): void {
    console.warn('ADD', this.createHeaderForm());
    this.measurementChartNew.insert(0, this.createHeaderForm());
  }

  private createHeaderForm(): FormGroup {
    return new FormGroup({
        header: new FormControl(null)
      }
    );
  }
}
