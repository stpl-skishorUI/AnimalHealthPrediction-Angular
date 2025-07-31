import { NgModule } from '@angular/core';
import { SecureComponent } from './secure.component';
import { Routes, RouterModule } from '@angular/router';
import { PredictionFormComponent } from '../../modules/secure/prediction-form/prediction-form.component';
import { PredictionResultComponent } from 'src/app/modules/secure/prediction-result/prediction-result.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: SecureComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: () => import('../../modules/secure/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard], data: { breadcrumb: [{ title: 'Dashboard', active: true }] }, },
  { path: 'prediction-form', component: PredictionFormComponent, canActivate: [AuthGuard], data: { breadcrumb: [{ title: 'Prediction Form', active: true }] }, },
  { path: 'prediction-result', component: PredictionResultComponent, canActivate: [AuthGuard], data: { breadcrumb: [{ title: 'Prediction Result', active: true }] }, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
