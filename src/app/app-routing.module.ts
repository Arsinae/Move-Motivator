import { NgModule } from '@angular/core';
import { AuthGuard, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin-guard.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
  { path: 'auth/action', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'stats', loadChildren: () => import('./pages/stats/stats.module').then(m => m.StatsModule), canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },  
  { path: 'goals', loadChildren: () => import('./pages/goal/goal.module').then(m => m.GoalModule), canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },  
  { path: 'game', loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule), canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },  
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard, AdminGuard], data: {authGuardPipe: redirectUnauthorizedToLogin} },
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
