import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BrandsService} from '../../../shared/services/brands.service';
import {CategoriesService} from '../../../shared/services/categories.service';
import {zip} from 'rxjs';
import {take} from 'rxjs/operators';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Router} from '@angular/router';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @ViewChild('warn')
  public readonly dialogWarn!: SwalComponent;
  public formSearch!: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private formBuilder: FormBuilder,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.verifyHasBrandsCategories();
  }

  private createForm(): void {
    this.formSearch = this.formBuilder.group({
      search: new FormControl(null)
    });
  }
  verifyHasBrandsCategories(): void {
    zip(
      this.brandsService.getAll(300, 0),
      this.categoriesService.getAll(300, 0)
    )
      .pipe(take(1))
      .subscribe(([brands, categories]) => {
        if (brands.content.length === 0 && categories.content.length === 0) {
          this.dialogWarn.title = 'Ops, ocorreu um problema';
          this.dialogWarn.text = 'Para acessar a página de produto é necessário ter cadastrado ao menos uma categoria e marca!';
          this.dialogWarn.fire();
        }
      }, () => {

      });
  }
  redirectTo(): void {
    this.router.navigateByUrl('/painel/categorias');

  }

}
