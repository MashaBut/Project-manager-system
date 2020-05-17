import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolDeliveryComponent } from './tool-delivery.component';
import { ToolDeliveryRoutingModule } from './tool-delivery-routing.module';
import { LocalizationModule } from 'angular-l10n';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolDeliveryTableComponent } from './tool-delivery-table/tool-delivery-table.component';
import { ToolDeliveryFormComponent } from './tool-delivery-form/tool-delivery-form.component';
import { CommonAppModule } from 'src/app/common/common.module';

@NgModule({
  declarations: [
    ToolDeliveryComponent,
    ToolDeliveryTableComponent,
    ToolDeliveryFormComponent
  ],
  imports: [
    CommonModule,
    ToolDeliveryRoutingModule,
    LocalizationModule,
    ReactiveFormsModule,
    CommonAppModule,
  ]
})
export class ToolDeliveryModule { }