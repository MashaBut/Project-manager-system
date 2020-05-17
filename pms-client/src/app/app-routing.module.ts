import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeManagerComponent } from './modules/setup/employee-management/employee/employee-manager/employee-manager.component';
import { HomeComponent } from './modules/shared/home/home.component';
import { DayOffFormComponent } from './modules/setup/employee-management/employee/day-off/day-off-form.component';
import { InstrumentServicesComponent } from './modules/production/technical/instrument-services/instrument-services.component';
import { CheckListViewComponent } from './modules/production/check-list/check-list-view/check-list-view.component';
import { CheckListEditComponent } from './modules/production/check-list/check-list-edit/check-list-edit.component';
import { PositionsManagerComponent } from './modules/setup/employee-management/employee/positions-manager/positions-manager.component';
import { ToolsComponent } from './modules/production/warehouse/tools/tools/tools.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'employee',
    component: EmployeeManagerComponent
  },
  {
    path: 'positions',
    component: PositionsManagerComponent
  },
  {
    path: 'day-off',
    component: DayOffFormComponent
  },
  {
    path: 'instrument-services',
    component: InstrumentServicesComponent
  },
  {
    path: 'facilities',
    loadChildren: () => import('./modules/production/manufacture/facilities/facilities.module').then(m => m.FacilitiesModule)
  },
  {
    path: 'tools',
    component: ToolsComponent
  },
  {
    path: 'tool-delivery',
    loadChildren: () => import('./modules/production/warehouse/tools/tool-delivery/tool-delivery.module').then(m => m.ToolDeliveryModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'check-list-edit',
    component: CheckListEditComponent
  },
  {
    path: 'check-list-view',
    component: CheckListViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
