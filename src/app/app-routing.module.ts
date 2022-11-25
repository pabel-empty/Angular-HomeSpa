import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardAdmin } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: 'admin-control',
    canActivate: [AuthGuardAdmin],
    data: { role: 'SUPER_ADMIN' },
    loadChildren: () => import( './admin-panel/admin-panel.module' ).then( m => m.AdminPanelModule ),
  },
  {
    path: '',
    loadChildren: () => import( './app-panel/app-panel.module' ).then( m => m.AppPanelModule ),
  },
];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
