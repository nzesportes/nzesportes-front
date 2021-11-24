import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductSizeService} from '../../../shared/services/product-size.service';
import {ProductSize, TableSize} from '../../../shared/models/product-size.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-size-guide',
  templateUrl: './size-guide.component.html',
  styleUrls: ['./size-guide.component.scss']
})
export class SizeGuideComponent implements OnInit {

  rota!: string;
  testar: string[] = ['um', 'dois', 'tres', 'quatro', 'cinco'];
  tables: TableSize[] = [];
  hasError = false;

  constructor(
    private router: Router,
    private productSizeService: ProductSizeService
  ) {
  }

  ngOnInit(): void {
    this.productSizeService.getAll(0, 0)
      .pipe(take(1))
      .subscribe(r => {
        r.forEach(item => {
          const hasItem = this.tables.find((table) => table.name.toLowerCase() === item.name.toLowerCase());
          if (!hasItem) {
            this.tables.push({
              name: item.name,
              image: item.image ? item.image : '',
              size: false,
              chest: false,
              height: false,
              length: false,
              sleeve: false,
              shoulder: false,
              width: false,
              indicated_height: false,
              indicated_weight: false,
              item: [item]
            });
          } else {
            this.tables.map(t => {
              if (t.name.toLowerCase() === hasItem.name.toLowerCase()) {
                t.item.push(item);
              }
            });
          }
        });
        this.tables = this.tables.map(result => {
          result.size = result.item.find((item) => item.size ) ? true : false;
          result.chest = result.item.find((item) => item.chest ) ? true : false;
          result.height = result.item.find((item) => item.height ) ? true : false;
          result.length = result.item.find((item) => item.length ) ? true : false;
          result.sleeve = result.item.find((item) => item.sleeve ) ? true : false;
          result.shoulder = result.item.find((item) => item.shoulder ) ? true : false;
          result.width = result.item.find((item) => item.width ) ? true : false;
          result.indicated_height = result.item.find((item) => item.indicated_height ) ? true : false;
          result.indicated_weight = result.item.find((item) => item.indicated_weight ) ? true : false;
          return result;
        });
      }, () => {
        this.hasError = true;
      });
    this.rota = this.router.url;
    this.rota = this.rota.slice(0, this.rota.indexOf('#', 0));
    console.log(this.rota);
  }
}
