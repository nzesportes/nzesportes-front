import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Brand} from '../../../shared/models/brand.model';
import {ErrorWarning} from '../../../shared/models/error-warning.model';
import {BrandsService} from '../../../shared/services/brands.service';

@Component({
  selector: 'app-brands-new',
  templateUrl: './brands-new.component.html',
  styleUrls: ['./brands-new.component.scss']
})
export class BrandsNewComponent implements OnInit {
  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  public formBrand: FormGroup = new FormGroup({});
  public brand!: Brand;
  hasError!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.hasError = false;
    this.createForm();
    if (this.router.url.includes('marcas/marca')) {
      this.route.params.pipe(
        map(p => p.id)
      ).subscribe(id => {
        this.brandService.getById(id)
          .pipe(take(1))
          .subscribe((b: Brand) => {
            this.brand = b;
            this.createForm();
          }, () => {
            this.hasError = true;
          });
      });
    }
  }

  private createForm(): void {
    this.formBrand = this.formBuilder.group({
      id: new FormControl(this.brand?.id ? this.brand.id : null),
      name: new FormControl(this.brand?.name ? this.brand.name : '', Validators.required),
      status: new FormControl(this.brand?.status ? this.brand.status : '', Validators.required),
      onMenu: new FormControl(this.brand?.onMenu ? this.brand.onMenu : '', Validators.required)
    });
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.errors && field.touched
    };
  }

  save(): void {
    const brand = this.formBrand.value;
    brand.name = brand.name.toLowerCase();
    const request = this.brand ?
      this.brandService.update(brand) :
      this.brandService.create(brand);
    request
      .pipe(take(1))
      .subscribe(() => {
        this.dialogSuccess.title = 'Marca salva com sucesso!';
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

  delete(): void {
    this.brandService.delete(this.brand?.id)
      .pipe(take(1))
      .subscribe(() => {
        this.dialogSuccess.title = 'Marca excluída com sucesso!';
        this.dialogSuccess.fire();
      }, (error: ErrorWarning) => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.delete();
          }
        });
      });
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/marcas');
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }


}
