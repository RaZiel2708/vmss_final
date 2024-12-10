
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVehicleInsuranceComponent } from './add-vehicle-insurance/add-vehicle-insurance.component';
import { InsuranceHistoryComponent } from './insurance-history/insurance-history.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { UnderwriterComponent } from './underwriter/underwriter.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterUnderWriterComponent } from './register-under-writer/register-under-writer.component';
import { DeleteComponent } from './delete/delete.component';
import { SuccessComponent } from './success/success.component';
import { AuthGuard } from './auth.guard';
import { ViewunderComponent } from './viewunder/viewunder.component';

const routes: Routes = [
  { path: 'add-insurance', component: AddVehicleInsuranceComponent },
  // { path: '', redirectTo: '/add-insurance', pathMatch: 'full' },
  {
    path: 'insurance-history',
    component: InsuranceHistoryComponent
  },
  { path: 'updatepassword', component: UpdatepasswordComponent },
  { path: 'underwriter', component: UnderwriterComponent, canActivate: [AuthGuard]},
  {path: '',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent, canActivate:[AuthGuard]},
  {path:'register-under-writer',component:RegisterUnderWriterComponent},
  {path:'delete',component:DeleteComponent},
  {path:'success',component:SuccessComponent},
  {path:'viewunder', component:ViewunderComponent},
  { path: '**', redirectTo: '/login' }
  // { path: '', redirectTo: '/insurance-history', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }