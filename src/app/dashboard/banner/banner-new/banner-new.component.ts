import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorWarning} from '../../../shared/models/error-warning.model';
import {take} from 'rxjs/operators';
import {LayoutImages} from '../../../shared/models/layout-images.model';
import {MenuService} from '../../../shared/services/menu.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-banner-new',
  templateUrl: './banner-new.component.html',
  styleUrls: ['./banner-new.component.scss']
})
export class BannerNewComponent implements OnInit {


  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  public formLayoutImages: FormGroup = new FormGroup({});
  public layoutImages!: LayoutImages;
  hasError!: boolean;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.createForm();
    this.menuService.getLayoutImages()
      .pipe(take(1))
      .subscribe(r => {
        if (r) {
          this.layoutImages = r;
          this.createForm();
        }
      }, () => this.hasError = true);
  }

  save(): void {
      this.menuService.postImages(this.formLayoutImages.value)
      .pipe(take(1))
      .subscribe(() => {
        this.dialogSuccess.title = 'Banner salvo com sucesso!';
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

  private createForm(): void {
    this.formLayoutImages = this.formBuilder.group({
      id: new FormControl(this.layoutImages?.id ? this.layoutImages.id : null),
      slideImages: new FormControl(this.layoutImages?.slideImages ? this.layoutImages.slideImages : '', Validators.required),
      bannerImages: new FormControl(this.layoutImages?.bannerImages ? this.layoutImages.bannerImages : '', Validators.required),
    });
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.errors && field.touched
    };
  }

  redirect(): void {
    this.router.navigateByUrl('/painel');
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }

}
