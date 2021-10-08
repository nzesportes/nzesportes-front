import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BannerNewComponent} from './banner-new/banner-new.component';


const routes: Routes = [
  {
    path: '',
    component: BannerNewComponent
  },
  // {
  //   path: 'novo-banner',
  //   component: BannerComponent
  // },
  // {
  //   path: 'banner/:id',
  //   component: BannerComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
