import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule), canActivate:[AuthGuard], data: {roles: ['customer']}},
  { path: 'provider', loadChildren: () => import('./provider/provider.module').then(m => m.ProviderModule), canActivate:[AuthGuard], data: {roles: ['provider']}},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'rd', loadChildren: () => import('./next/next.module').then(m => m.NextModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
