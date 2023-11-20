import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MyVideosComponent } from './my-videos/my-videos.component';
import { TetrisComponent } from './tetris/tetris.component';
import { AuthnExtensionComponent } from './authn-extension/authn-extension.component';
import { AuthnExpiredComponent } from './authn-expired/authn-expired.component';
import { AuthnErrorComponent } from './authn-error/authn-error.component';




@NgModule({
  declarations: [HomeComponent, MyVideosComponent, TetrisComponent, AuthnExtensionComponent, AuthnExpiredComponent, AuthnErrorComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class StaticModule { }
