import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAnalyticsRoutingModule } from './dashboard-analytics-routing.module';
import { DashboardAnalyticsComponent } from './dashboard-analytics.component';
import { ChartModule } from '../../../../@vex/components/chart/chart.module';
import { MatIconModule } from '@angular/material/icon';
import { WidgetQuickLineChartModule } from '../../../../@vex/components/widgets/widget-quick-line-chart/widget-quick-line-chart.module';
import {
  WidgetQuickValueCenterModule
} from '../../../../@vex/components/widgets/widget-quick-value-center/widget-quick-value-center.module';
import { WidgetQuickValueStartModule } from '../../../../@vex/components/widgets/widget-quick-value-start/widget-quick-value-start.module';
import { WidgetLargeGoalChartModule } from '../../../../@vex/components/widgets/widget-large-goal-chart/widget-large-goal-chart.module';
import { WidgetAssistantModule } from '../../../../@vex/components/widgets/widget-assistant/widget-assistant.module';
import { WidgetLargeChartModule } from '../../../../@vex/components/widgets/widget-large-chart/widget-large-chart.module';
import { WidgetTableModule } from '../../../../@vex/components/widgets/widget-table/widget-table.module';
import { SecondaryToolbarModule } from '../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { MatButtonModule } from '@angular/material/button';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { TestCaseRoutingModule } from '../test-case/test-case-routing.module';

@NgModule({
  declarations: [DashboardAnalyticsComponent],
  imports: [
    CommonModule,
    TestCaseRoutingModule,
    ChartModule,
    MatIconModule,
    WidgetQuickLineChartModule,
    WidgetQuickValueCenterModule,
    WidgetQuickValueStartModule,
    WidgetLargeGoalChartModule,
    WidgetAssistantModule,
    WidgetLargeChartModule,
    WidgetTableModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    MatButtonModule,
    PageLayoutModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,

    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class DashboardAnalyticsModule {
}
