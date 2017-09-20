import { Component,OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { Blog } from './blog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {LoginService} from 'app/components/login/login.service';

@Component({
  
  templateUrl: 'blogAdd.component.html',
  styleUrls: ['blogList.component.css','blogEdit.component.css']
  
})
export class BlogAddComponent implements OnInit {
  public blog : Blog;
  public user;
  constructor( private _blogService : BlogService ,private route: ActivatedRoute,private router: Router, private _loginService : LoginService)
  {
       
  this.user=localStorage.getItem("userName");
 this.blog=new Blog();
  this.blog.userId=localStorage.getItem('userID');
  this.blog.userName=localStorage.getItem('userName');
  } 
 ngOnInit()
 {
   
  
 }
 doAdd()
 {
  
   if(this.blog.name==undefined)
   {
    alert("Please Enter Blog Heading"); 
   }
   else if(this.blog.description==undefined)
   {
      alert("Please Enter Blog Description"); 
   }
    else{
   
   this._blogService.addBlog(this.blog).
   subscribe((x)=>{
     
      this.router.navigate(["\list"]); 
      
    });
   
    }
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
