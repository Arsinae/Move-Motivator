import { NgModule } from '@angular/core';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
  { path: 'auth/action', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'stats', loadChildren: () => import('./pages/stats/stats.module').then(m => m.StatsModule), canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },  
  { path: 'goals', loadChildren: () => import('./pages/goal/goal.module').then(m => m.GoalModule), canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },  
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
