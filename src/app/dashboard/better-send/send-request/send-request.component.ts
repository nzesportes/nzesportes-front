import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.scss']
})
export class SendRequestComponent implements OnInit {
  url = '';
  constructor() { }

  ngOnInit(): void {
    const url = environment.ME_URL;
    const clientId = environment.ME_CLIENT_ID;
    const redirectUri = environment.ME_REDIRECT_URI;
    const responseType =  'code';
    const scope = environment.ME_REQUEST_SCOPE;
    const state = environment.ME_STATE;
    this.url = `${url}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;
  }

}
