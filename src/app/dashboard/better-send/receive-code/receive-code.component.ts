import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {BetterSendService} from '../../../shared/services/better-send.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-receive-code',
  templateUrl: './receive-code.component.html',
  styleUrls: ['./receive-code.component.scss']
})
export class ReceiveCodeComponent implements OnInit {
  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  constructor(
    private activatedRouter: ActivatedRoute,
    private betterSend: BetterSendService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.pipe(
      take(1),
      map(p => p.code)
    ).subscribe( result => {
       this.betterSend.postToken(result)
         .pipe(take(1))
         .subscribe(() => {
           this.dialogSuccess.title  = 'Integração com a melhor envio feita com sucesso!';
           this.dialogSuccess.fire().then(() => {
             this.redirect();
           });
         }, () => {
           this.dialogError.fire().then((r) => {
             if (r.isConfirmed) {
               this.ngOnInit();
             }else{
               this.redirect();
             }
           });
         });
    });
  }
  redirect(): void {
    this.router.navigateByUrl('/painel/melhor-envio');
  }

}
