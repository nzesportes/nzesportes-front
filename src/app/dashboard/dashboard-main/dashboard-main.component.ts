import {Component, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import * as $ from 'jquery';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {BrandsService} from '../../shared/services/brands.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {zip} from 'rxjs';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../shared/services/token-storage.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  @ViewChild('warn')
  public readonly dialogWarn!: SwalComponent;

  constructor(
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    // Toggle Click Function
    // tslint:disable-next-line:only-arrow-functions typedef
    $('#menu-toggle').click(function(e: { preventDefault: () => void; }) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }

  isMobile(): boolean {
    console.log(window.innerWidth);
    const windowWidth = window.innerWidth;
    const userAgent = window.navigator.userAgent.toLocaleLowerCase();
    return userAgent.includes('iphone') || userAgent.includes('android') || windowWidth < 768;
  }

  verifyHasBrandsCategories(): void {
    zip(
      this.brandsService.getAll(1, 0),
      this.categoriesService.getAll(1, 0)
    )
      .pipe(take(1))
      .subscribe(([brands, categories]) => {
        if (brands.content.length === 0 || categories.content.length === 0) {
          this.dialogWarn.title = 'Ops, ocorreu um problema';
          this.dialogWarn.text = 'Para acessar a página de produto é necessário ter cadastrado ao menos uma categoria e marca!';
          this.dialogWarn.fire();
        } else {
          this.router.navigateByUrl('/painel/produtos');
        }
      }, () => {

      });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
