import { Component,OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { Blog } from './blog';
import {LoginService} from 'app/components/login/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  
  templateUrl: 'blogView.component.html',
  styleUrls: ['blogList.component.css','blogEdit.component.css']
})
export class BlogViewComponent implements OnInit {
  public blog : Blog;
  public user;
  constructor( private _blogService : BlogService ,private route: ActivatedRoute,private router: Router, private _loginService : LoginService)
  {
       
  
 this.blog=new Blog();
  this.user=localStorage.getItem("userName")
  } 
 ngOnInit()
 {
     
   
  this.route.paramMap
    .switchMap((params: ParamMap) =>
      this._blogService.getBlog(params.get('id')))
    .subscribe((blog: Blog) => this.blog = blog);
 }
 doExit()
 {
   
     
      this.router.navigate(["\list"]); 
      
    }
  doLogOut()
{
  this._loginService.logOut().
  subscribe((x) =>{
    localStorage.removeItem('x-acess-token');
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    this.router.navigate(["login"]);
  }
  )
}  
   
 
  
}
