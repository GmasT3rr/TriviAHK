import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { SettingsComponent } from './settings/settings.component';
import { QuizzesComponent } from './quizzes/quizzes.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { QuizInfoComponent } from './quiz-info/quiz-info.component';



@NgModule({
  declarations: [
    ProfileComponent,
    PasswordComponent,
    SettingsComponent,
    QuizzesComponent,
    QuizInfoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule
    
  ]
})
export class UserModule { }
