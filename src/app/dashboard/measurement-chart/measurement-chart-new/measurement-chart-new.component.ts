import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ProductSize} from '../../../shared/models/product-size.model';
import {ProductSizeService} from '../../../shared/services/product-size.service';
import {map, take} from 'rxjs/operators';
import {ErrorWarning} from '../../../shared/models/error-warning.model';
import {Brand} from '../../../shared/models/brand.model';

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
  public productSize!: ProductSize;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productSizeService: ProductSizeService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.hasError = false;
    this.createForm();
    if (this.router.url.includes('tabela-medidas/editar')) {
      this.route.params.pipe(
        map(p => p.id)
      ).subscribe(id => {
        this.productSizeService.getById(id)
          .pipe(take(1))
          .subscribe((b: ProductSize) => {
            this.productSize = b;
            this.createForm();
          }, () => {
            this.hasError = true;
          });
      });
    }
  }

  createForm(): void {
    this.formMCNew = this.formBuilder.group({
      id: new FormControl(this.productSize?.id ? this.productSize.id : null),
      name: new FormControl(this.productSize?.name ? this.productSize.name : '', Validators.required),
      size: new FormControl(this.productSize?.size ? this.productSize.size : ''),
      chest: new FormControl(this.productSize?.chest ? this.productSize.chest : ''),
      height: new FormControl(this.productSize?.height ? this.productSize.height : ''),
      length: new FormControl(this.productSize?.length ? this.productSize.length : ''),
      sleeve: new FormControl(this.productSize?.sleeve ? this.productSize.sleeve : ''),
      shoulder: new FormControl(this.productSize?.shoulder ? this.productSize.shoulder : ''),
      width: new FormControl(this.productSize?.width ? this.productSize.width : ''),
      indicated_height: new FormControl(this.productSize?.indicated_height ? this.productSize.indicated_height : ''),
      indicated_weight: new FormControl(this.productSize?.indicated_weight ? this.productSize.indicated_weight : ''),
      image: new FormControl(this.productSize?.image ? this.productSize.image : ''),
    });
  }

  save(): void {
    const request = this.productSize ?
      this.productSizeService.update(this.formMCNew.value) :
      this.productSizeService.create(this.formMCNew.value);
    request
      .pipe(take(1))
      .subscribe(() => {
        this.dialogSuccess.title = 'Tabela de medida salva com sucesso!';
        this.dialogSuccess.fire();
      }, (error: ErrorWarning) => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.save();
          }
        });
      });

  }

  get validateFields(): any {
    return this.formMCNew.controls;
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/tabela-medidas');
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.errors && field.touched
    };
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }
}
