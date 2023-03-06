import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { TestCaseComponent } from './test-case.component';


const routes: Routes = [
  {
    path: '',
    component: TestCaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class TestCaseRoutingModule {
}
