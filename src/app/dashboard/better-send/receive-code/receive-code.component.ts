import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-receive-code',
  templateUrl: './receive-code.component.html',
  styleUrls: ['./receive-code.component.scss']
})
export class ReceiveCodeComponent implements OnInit {

  constructor(
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.pipe(
      take(1),
      map(p => p.code)
    ).subscribe( result => {
      console.log('Code melhor envio', result);
    });
  }

}
