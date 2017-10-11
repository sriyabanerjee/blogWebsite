import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }  from '@angular/router';

import { AppComponent } from './app.component';
import { LoginService } from './components/login/login.service';
import { LoginComponent } from './components/login/login.component';
import { Login } from './components/login/login';
import { BlogListComponent } from './components/blog/blogList.component';
import { BlogService } from './components/blog/blog.service';
import { Blog } from './components/blog/Blog';
import { BlogEditComponent } from './components/blog/blogEdit.component';
import { BlogViewComponent } from './components/blog/blogView.component';
import { BlogAddComponent } from './components/blog/blogAdd.component';
import { UserService } from './components/users/user.service';
import { UserComponent } from './components/users/user.component';
import { User } from './components/users/user';
import { ReadMoreComponent } from './components/login/readMore.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list', component: BlogListComponent },
  { path: '', component: LoginComponent },
  { path: 'edit/:id', component: BlogEditComponent },
  { path: 'view/:id', component: BlogViewComponent },
  { path: 'add', component: BlogAddComponent },
  { path: 'user', component: UserComponent }
]
  @NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlogListComponent,
    BlogEditComponent,
    BlogViewComponent,
    BlogAddComponent,
    UserComponent,
    ReadMoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  exports: [
    RouterModule
  ],
  providers: [LoginService,BlogService,UserService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
