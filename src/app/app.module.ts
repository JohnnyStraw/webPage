import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FejlecComponent } from './fejlec_component/fejlec.component';
import { RouterModule, Routes } from '@angular/router';
import { PageRolamComponent } from './page-rolam/page-rolam.component';
import { PageMainComponent } from './page-main/page-main.component';
import { PageEgyebComponent } from './page-egyeb/page-egyeb.component';
import { PageProjectekComponent } from './page-projectek/page-projectek.component';
import { BlankComponent } from './blank/blank.component';
import { AdminComponent } from './admin/admin.component';
import { WriteArticleComponent } from './write-article/write-article.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import {ArticleService} from './article.service';




const appRoutes: Routes = [
  { path: 'rolam', component: PageRolamComponent },
  { path: 'projectek', component: PageProjectekComponent },
  { path: 'egyeb', component: PageEgyebComponent },
  { path: '#', component: PageMainComponent },
  { path: '', component: PageMainComponent },
  { path: 'admin', component: AdminComponent }



];

@NgModule({
  declarations: [
     PageRolamComponent, PageMainComponent, PageEgyebComponent, PageProjectekComponent, FejlecComponent, BlankComponent, AdminComponent, WriteArticleComponent,FileSelectDirective
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),FormsModule,HttpModule,HttpClientModule
  ],
  providers: [ArticleService],
  bootstrap: [BlankComponent]
})
export class AppModule { }
