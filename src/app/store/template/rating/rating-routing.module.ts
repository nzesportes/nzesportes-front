import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RatingComponent} from './rating.component';
import {RatingFormComponent} from './rating-form/rating-form.component';

const routes: Routes = [
  {
    path: '',
    component: RatingComponent,
    children: [
      {
        path: '',
        component: RatingFormComponent
      },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingRoutingModule {
}
