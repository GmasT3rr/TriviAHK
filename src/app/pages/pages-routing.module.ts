import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { AuthenticationGuard } from '../guards/authentication.guard';


const routes: Routes = [

  {path:'home', 
  canActivate:[AuthenticationGuard],
  component: HomeComponent},
  
  {path:'landing', component: LandingComponent},
  {path: '**', pathMatch:'full', redirectTo:'landing'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
