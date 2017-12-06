import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }  from '@angular/router';

import { AppComponent } from './app.component';
import { LoginService } from 'app/services/login.service';
import { LoginComponent } from './components/login/login.component';
import { Login } from 'app/models/login';
import { BlogListComponent } from './components/blog/blogList.component';
import { BlogService } from 'app/services/blog.service';
import { Blog } from 'app/models/Blog';
import { BlogEditComponent } from './components/blog/blogEdit.component';

import { BlogAddComponent } from './components/blog/blogAdd.component';
import { UserService } from 'app/services/user.service';
import { UserComponent } from './components/users/user.component';
import { User } from 'app/models/user';
import { ReadMoreComponent } from './components/readMore.component';
import { HomeComponent } from 'app/components/home/home.component';
import { Catagory} from './models/catagory';
import { CatagoryService} from './services/catagory.service';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RegistrationComponent } from 'app/components/registration/registration.component'

const appRoutes: Routes = [
  //{ path: 'login', component: LoginComponent },
  { path: 'list', component: BlogListComponent },
  { path: '', component: HomeComponent },
  { path: 'edit/:id', component: BlogEditComponent },
  
  { path: 'add', component: BlogAddComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent }
]

  @NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlogListComponent,
    BlogEditComponent,
    
    BlogAddComponent,
    UserComponent,
    ReadMoreComponent,
    HomeComponent,
   RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports: [
    RouterModule
  ],
  providers: [LoginService,BlogService,UserService,CatagoryService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
