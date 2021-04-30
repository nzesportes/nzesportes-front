import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BrandsListComponent} from './brands-list/brands-list.component';
import {BrandsNewComponent} from './brands-new/brands-new.component';


const routes: Routes = [
  {
    path: '',
    component: BrandsListComponent
  },
  {
    path: 'nova-marca',
    component: BrandsNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
