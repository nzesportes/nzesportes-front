import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {CategoriesNewComponent} from './categories-new/categories-new.component';


const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent
  },
  {
    path: 'nova-categoria',
    component: CategoriesNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
