import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { PasswordComponent } from './password/password.component';
import { QuizInfoComponent } from './quiz-info/quiz-info.component';

const routes: Routes = [
  {path:'quizzes', component: QuizzesComponent},
  {path:'quizzes/:id', component: QuizInfoComponent},
  {path:'profile', component: ProfileComponent},
  {path:'settings', component: SettingsComponent},
  {path:'password', component: PasswordComponent},
  
  
  {path: '**', pathMatch:'full', redirectTo:'profile'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
