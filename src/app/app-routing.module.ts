import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';



const routes: Routes = [
  {
    path: "user",
    canActivate:[AuthenticationGuard],
    loadChildren: () => import("./user/user.module").then(m => m.UserModule),
  },
  {
    path: "main",
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule),
  },

  {path: '**', pathMatch:'full', redirectTo:'main'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
