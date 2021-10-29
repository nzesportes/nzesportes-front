import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MeasurementChartListComponent} from './measurement-chart-list/measurement-chart-list.component';
import {MeasurementChartNewComponent} from './measurement-chart-new/measurement-chart-new.component';

const routes: Routes = [
  {
    path: '',
    component: MeasurementChartListComponent
  },
  {
    path: 'nova',
    component: MeasurementChartNewComponent
  },
  {
    path: 'editar/:id',
    component: MeasurementChartNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeasurementChartRoutingModule { }
