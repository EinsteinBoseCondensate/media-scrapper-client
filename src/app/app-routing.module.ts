import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/static/home/home.component';
import { MyVideosComponent } from './routes/static/my-videos/my-videos.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { TetrisComponent } from './routes/static/tetris/tetris.component';
import { AuthnExtensionComponent } from './routes/static/authn-extension/authn-extension.component';
import { auth0ActionJwtAuthGuard } from './shared/auth-guards/auth0-action-jwt-auth-guard';
import { AuthnErrorComponent } from './routes/static/authn-error/authn-error.component';
import { AuthnExpiredComponent } from './routes/static/authn-expired/authn-expired.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'my-videos',
    component: MyVideosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tetris',
    component: TetrisComponent
  },
  {
    path: 'authn-extension',
    component: AuthnExtensionComponent,
    canActivate: [auth0ActionJwtAuthGuard]
  },
  {
    path: 'authn-error',
    component: AuthnErrorComponent
  },
  {
    path: 'authn-expired',
    component: AuthnExpiredComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
