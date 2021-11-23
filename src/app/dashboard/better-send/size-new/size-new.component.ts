import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Brand} from '../../../shared/models/brand.model';
import {SizeBetterSend} from '../../../shared/models/size-better-send.model';
import {BrandsService} from '../../../shared/services/brands.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {BetterSendService} from '../../../shared/services/better-send.service';
import {SizeBetterSendService} from '../../../shared/services/size-better-send.service';
import {ErrorWarning} from '../../../shared/models/error-warning.model';

@Component({
  selector: 'app-size-new',
  templateUrl: './size-new.component.html',
  styleUrls: ['./size-new.component.scss']
})
export class SizeNewComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  public formSize: FormGroup = new FormGroup({});
  public sizeBetterSend!: SizeBetterSend;
  hasError!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: SizeBetterSendService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.createForm();
    if (this.router.url.includes('melhor-envio/tamanho/')) {
      this.route.params.pipe(
        map(p => p.id)
      ).subscribe(id => {
        this.brandService.getById(id)
          .pipe(take(1))
          .subscribe((b: SizeBetterSend) => {
            this.sizeBetterSend = b;
            this.createForm();
          }, () => {
            this.hasError = true;
          });
      });
    }
  }

  private createForm(): void {
    this.formSize = this.formBuilder.group({
      id: new FormControl(this.sizeBetterSend?.id ? this.sizeBetterSend.id : null),
      type: new FormControl(this.sizeBetterSend?.type ? this.sizeBetterSend.type : '', Validators.required),
      weight: new FormControl(this.sizeBetterSend?.weight ? this.sizeBetterSend.weight : '', Validators.required),
      length: new FormControl(this.sizeBetterSend?.length ? this.sizeBetterSend.length : '', Validators.required),
      depth: new FormControl(this.sizeBetterSend?.depth ? this.sizeBetterSend.depth : '', Validators.required),
      height: new FormControl(this.sizeBetterSend?.height ? this.sizeBetterSend.height : '', Validators.required)
    });
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.errors && field.touched
    };
  }

  save(): void {
    const sizeRequest = this.formSize.value;
    sizeRequest.type = sizeRequest.type.toLowerCase();
    const request = this.sizeBetterSend ?
      this.brandService.update(sizeRequest) :
      this.brandService.create(sizeRequest);
    request
      .pipe(take(1))
      .subscribe(() => {
        this.dialogSuccess.title = 'Tamanho melhor envio salva com sucesso!';
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

  redirect(): void {
    this.router.navigateByUrl('/painel/melhor-envio');
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }

}
