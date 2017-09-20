import { Component,OnInit,TemplateRef,ViewChild, ElementRef } from '@angular/core';
import { BlogService } from './blog.service';
import { Blog } from './blog';
import { User } from 'app/components/users/user';
import { Router } from '@angular/router';
import {LoginService} from 'app/components/login/login.service';
import {UserService} from 'app/components/users/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

//import { Login } from './login';

@Component({
  
  templateUrl: 'blogList.component.html',
  //template:`<router-outlet></router-outlet>`,
  styleUrls: ['blogList.component.css']
})
export class BlogListComponent implements OnInit {
   @ViewChild('deleteModal') deleteModal;
  public _blog:Blog[];
  public user;
  public users : User[];
  public modalRef: BsModalRef;
  blog:Blog;
  public config = {
    
    backdrop: true,
    ignoreBackdropClick: true
  };
  constructor( private _blogService : BlogService, private _router : Router, private _loginService : LoginService, private _userService : UserService, private modalService: BsModalService)
  {
       
    //this._blog=new Array <Blog>();
  } 
 ngOnInit()
 {
   this.user=localStorage.getItem("userName");
   
  this._blogService.getblogs().
    subscribe((x)=>{
      this._blog=x;
      
      
    });
    this._userService.getAllUsers().
  subscribe((x)=>{
    let newUser=new User();
    newUser.username="All";
     x.unshift(newUser);
       this.users=x;
       
    }

  )
    
 }
 doEdit(x)
 {
   
   if(x.userId==localStorage.getItem('userID'))
   {
     this._router.navigate(["edit",x.id]);
     
    }
    else{
      alert("You are not authorized to edit this blog");
    }
 }
 doShow(x)
 {
  
   this._router.navigate(["view",x.id]);
 }
 doConfirm(x)
 {
   if(x.userId==localStorage.getItem('userID'))
   {
     this.blog=x;
     this.openModal(this.deleteModal);
     
    }
    else{
      alert("You are not authorized to delete this blog");
    }
   
  
 }
 doHide()
 {
   this.modalRef.hide();
 }
 doDelete()
 {
   
   this.modalRef.hide();
  this._blogService.deleteBlog(this.blog).
      subscribe((x)=>{
        this._blogService.getblogs().
          subscribe((x)=>{
            this._blog=x;
          });
       });
 }
 doAdd()
 {
   this._router.navigate(["add"]);
 }
 doLogOut()
{
  this._loginService.logOut().
  subscribe((x) =>{
    localStorage.removeItem('x-acess-token');
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    this._router.navigate(["login"]);
  }
  )
} 
/*getAllUsers()
{
  this._userService.getAllUsers().
  subscribe((x)=>{
      this.users=x;
       
    }

  )
}*/
public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
    console.log(this.modalRef);
  }
}
