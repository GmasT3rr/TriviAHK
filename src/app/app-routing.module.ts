import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LandingComponent } from './public/landing/landing.component';



const routes: Routes = [
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then(m => m.UserModule),
    canActivate:[AuthenticationGuard],

  },

  {
    path: "main",
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule),
    canActivate:[AuthenticationGuard],
  },
  
  {
    path: "landing",
    component:LandingComponent
  },

  
  {path: '**', pathMatch:'full', redirectTo:'landing'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
