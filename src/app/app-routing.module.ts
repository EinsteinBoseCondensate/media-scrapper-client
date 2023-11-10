import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/static/home/home.component';
import { MyVideosComponent } from './routes/static/my-videos/my-videos.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { TetrisComponent } from './routes/static/tetris/tetris.component';

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
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
