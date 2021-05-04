import {Component, OnInit} from '@angular/core';
import {BrandsService} from '../../shared/services/brands.service';
import {take} from 'rxjs/operators';
import {Brand} from '../../shared/models/brand.model';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {

  brands: Brand[] = [];
  page = 0;
  constructor(
    private brandsService: BrandsService
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.brandsService.getAll(10, this.page)
      .pipe(take(1))
      .subscribe(r => {
        this.brands = r.content;
        console.log(r);
      }, error => {

      });
  }


}
