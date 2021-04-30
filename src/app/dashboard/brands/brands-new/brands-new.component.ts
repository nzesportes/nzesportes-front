import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BrandsService} from '../../shared/services/brands.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-brands-new',
  templateUrl: './brands-new.component.html',
  styleUrls: ['./brands-new.component.scss']
})
export class BrandsNewComponent implements OnInit {
  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  public formBrand: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.formBrand = this.formBuilder.group({
      id: new FormControl(null),
      name: new FormControl('', Validators.required),
    });
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.invalid && field.touched
    };
  }

  save(): void {
    this.brandService.create(this.formBrand.value)
      .pipe(take(1))
      .subscribe(r => {
        this.dialogSuccess.fire();
        console.log(r);
      }, error => {

      });
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/marcas');
  }

}
