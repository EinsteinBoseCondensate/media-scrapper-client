import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MyVideosComponent } from './my-videos/my-videos.component';




@NgModule({
  declarations: [HomeComponent, MyVideosComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class StaticModule { }
