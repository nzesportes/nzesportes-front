import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BetterSendService} from '../../../shared/services/better-send.service';
import {take} from 'rxjs/operators';
import {BetterSendTokenStatus} from '../../../shared/models/BetterSendTokenStatus.model';
import {BetterSendStatus} from '../../../shared/enums/BetterSendStatus.enum';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {SizeBetterSend} from '../../../shared/models/size-better-send.model';
import {SizeBetterSendPage} from '../../../shared/models/pagination-model/size-better-send-page.model';
import {PaginationService} from '../../../shared/services/pagination.service';
import {SizeBetterSendService} from '../../../shared/services/size-better-send.service';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.scss']
})
export class SendRequestComponent implements OnInit {
  url = '';
  betterSend!: BetterSendTokenStatus;
  hasError!: boolean;

  textButton = '';
  message = '';

  status = BetterSendStatus;

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;
  content: SizeBetterSendPage | undefined;
  sizeBetterSends: SizeBetterSend[] = [];
  constructor(
    private betterSendService: BetterSendService,
    public paginationService: PaginationService,
    private sizeBetterSendService: SizeBetterSendService
  ) { }

  ngOnInit(): void {
    this.hasError = false;
    const url = environment.ME_URL;
    const clientId = environment.ME_CLIENT_ID;
    const redirectUri = environment.ME_REDIRECT_URI;
    const responseType = 'code';
    const scope = environment.ME_REQUEST_SCOPE;
    const state = environment.ME_STATE;
    this.url = `${url}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;

    this.getStatusBetterSend();

    this.paginationService.initPagination();
    this.getAllSizes(10, this.paginationService.page);

  }

  getStatusBetterSend(): void {
    this.betterSendService.getStatusBetterSend()
      .pipe(take(1))
      .subscribe(r => {
        this.betterSend = r;

        switch (this.betterSend.status){
          case BetterSendStatus.UNCREATED:
            this.setMessages('Habilite a integração do Melhor envio a nossa plataforma.', 'Habilitar');
            break;
          case BetterSendStatus.EXPIRED:
            this.setMessages('Token expirado! Seu token se tornará inválido em alguns dias, você precisa habilitar um novo token.', 'habilitar');
            break;
          case BetterSendStatus.INVALID:
            this.setMessages('Token inválido! Você precisa habilitar um novo token', 'habilitar');
            break;
          default:
            this.setMessages('Integração com Melhor envio está funcionando corretamente.', '');
            break;
        }
      }, () => {
        this.hasError = true;
      });
  }

  setMessages(message: string, textButton: string): void{
    this.message = message;
    this.textButton = textButton;
  }

  getAllSizes(size: number, page: number, type?: string): void {
    this.sizeBetterSendService.getAll(size, page, type)
      .pipe(take(1))
      .subscribe(r => {
        this.sizeBetterSends = r.content;
        this.content = r;
        this.paginationService.getPageRange(this.content.totalElements);
      }, () => {
        this.hasError = true;
      });
  }

  updateIndex(index: number): void {
    this.getAllSizes(10, index);
    this.paginationService.page = index;
  }

  onChangeFilter(search: string): void {
    this.paginationService.page = 0;
    this.getAllSizes(10, 0, search);
  }

}
