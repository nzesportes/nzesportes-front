import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Brand} from '../../shared/models/brand.model';
import {Product} from '../../shared/models/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  public formProduct: FormGroup = new FormGroup({});
  public product!: Product;
  hasError!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.formProduct = this.formBuilder.group({
      id: new FormControl(this.product?.id ? this.product.id : null),
      description: new FormControl(this.product?.description ? this.product.description : '', Validators.required),
      model: new FormControl(this.product?.model ? this.product.model : '', Validators.required),
      category:  this.formBuilder.array(this.product?.category ? this.product.category : []),
      productDetails:  this.formBuilder.array(this.product?.productDetails ? this.product.productDetails : []),
      status: new FormControl(this.product?.status ? this.product.status : null),
    });
  }

  save(): void {
  }

  redirect(): void{
  }

}
