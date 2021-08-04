import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.scss']
})
export class SendRequestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sendRequest(): void {
    const url = environment.ME_URL;
    const clientId = environment.ME_CLIENT_ID;
    const redirectUri = environment.ME_REDIRECT_URI;
    const responseType =  'code';
    const scope = environment.ME_REQUEST_SCOPE;
    const state = environment.ME_STATE;
    window.location.href = `${url}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}%2F&response_type=${responseType}&scope=${scope}&state=${state}`;
  }

}
