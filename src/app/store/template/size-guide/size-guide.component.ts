import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-size-guide',
  templateUrl: './size-guide.component.html',
  styleUrls: ['./size-guide.component.scss']
})
export class SizeGuideComponent implements OnInit {

  rota!: string;
  testar: string[] = ['um', 'dois', 'tres', 'quatro', 'cinco'];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.rota = this.router.url;
  }



}
