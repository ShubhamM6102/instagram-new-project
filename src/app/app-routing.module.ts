import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

// const routes: Routes = [];



const routes: Routes = [
  {
   path:'',
   component: LoginComponent,
  },
  {
    path:'home/:email',
    component: HomeComponent,
    canActivate: [ AuthGuardService],
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
