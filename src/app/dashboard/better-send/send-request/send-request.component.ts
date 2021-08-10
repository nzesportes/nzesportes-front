import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BetterSendService} from '../../../shared/services/better-send.service';
import {take} from 'rxjs/operators';
import {BetterSendTokenStatus} from '../../../shared/models/BetterSendTokenStatus.model';
import {BetterSendStatus} from '../../../shared/enums/BetterSendStatus.enum';

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
  constructor(
    private betterSendService: BetterSendService
  ) { }

  ngOnInit(): void {
    const url = environment.ME_URL;
    const clientId = environment.ME_CLIENT_ID;
    const redirectUri = environment.ME_REDIRECT_URI;
    const responseType = 'code';
    const scope = environment.ME_REQUEST_SCOPE;
    const state = environment.ME_STATE;
    this.url = `${url}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;

    this.getStatusBetterSend();
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

}
