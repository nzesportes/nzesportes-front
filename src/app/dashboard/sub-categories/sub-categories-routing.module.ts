import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SubCategoriesListComponent} from './sub-categories-list/sub-categories-list.component';
import {SubCategoriesNewComponent} from './sub-categories-new/sub-categories-new.component';


const routes: Routes = [
  {
    path: '',
    component: SubCategoriesListComponent
  },
  {
    path: 'nova-sub-categoria',
    component: SubCategoriesNewComponent
  },
  {
    path: 'sub-categoria/:id',
    component: SubCategoriesNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoriesRoutingModule { }
