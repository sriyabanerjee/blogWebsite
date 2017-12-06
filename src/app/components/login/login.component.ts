import { Component,TemplateRef,OnInit,ViewChild, ElementRef,Input, EventEmitter,Output } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { LoginService } from 'app/services/login.service';
import { ReadMoreComponent } from 'app/components/readMore.component';
import { UserComponent } from 'app/components/users/user.component';
import { UserService } from 'app/services/user.service';
import { BlogService } from 'app/services/blog.service';
import { Blog } from 'app/models/blog';
import { Login } from 'app/models/login';
import { User } from 'app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  public login;
  public user : User;
  public newUser : User;
  private id;
  public _blog:Blog[];
  public totalItems: number = 64;
  public itemsPerPage:number =3;
  public currentPage: number = 1;
  public smallnumPages: number = 0;
  private isLoggedin;
  //private _maxNo: number = 3;
  private _blogs:Blog[];
  public modalRef: BsModalRef;
  public config = {
    
    backdrop: true,
    ignoreBackdropClick: true
  };
    @ViewChild('logIn') logInModal;  
     @Output() messageEvent = new EventEmitter<boolean>();
    @Input() childmodalRef: BsModalRef;
  constructor( private _loginService : LoginService, private _router : Router, private modalService: BsModalService,private _userService : UserService,private _blogService : BlogService)
  {
      this.login = new Login();
      this.newUser = new User();
      this._blog = new Array <Blog>();
      this._blogs = new Array <Blog>();
  }
  ngOnInit()
 {
   
  this._blogService.countBlogs().
    subscribe((x)=>{
      
      this.totalItems=x.count;
      //alert(this.totalItems);
     
    }); 
    
  this._blogService.getblogsPaginationOld(0,this.itemsPerPage).
    subscribe((x)=>{
      this._blog=x;
    //  this._blogs=x;
    //  alert(this._blogs[0]);
    //   for (var index = 0; index <  this.itemsPerPage; index++) {
    //     this._blog[index] = this._blogs[index];
        
     // }
      
      
    });
 }
 
 
  getToken()
  {
      this. doHideModal();
      if(this.login.username == null || this.login.password == null)
      {
        alert("Plaese enter Username and password to login");
      }
      else
      {
       this._loginService.getToken(this.login).
       subscribe((x) =>{
         
        this. id=x.userId;
        localStorage.setItem('x-acess-token',x.id);
        localStorage.setItem('userID',x.userId);
        this._userService.getUser(this. id).
        subscribe((user) =>{
          this.user=user;
          localStorage.setItem('userName',this.user.username);
          localStorage.setItem('userEmail',this.user.email);
          this._loginService.changeLoggedIn(true);
          this.messageEvent.emit(true);
          this._router.navigate(["list"]);
          }
          )
           
           
        })
      }
  }
  
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }
  doHide()
  {
    // this.newUser.email=undefined;
    // this.newUser.password=undefined;
    // this.newUser.username=undefined;
    this.modalRef.hide(); 
  }
  doHideModal()
  {
    this.childmodalRef.hide();
  }
  createNewUser()
  {
    
    if(this.newUser.email==undefined)
    {
      alert("Please Enter EmailID");
    }
    else if(this.newUser.password==undefined)
    {
      alert("Please Enter Password");
    }
    else if(this.newUser.username==undefined)
    {
      alert("Please Enter UserName");
    }
    else{
      this.newUser.email=undefined;
      this.newUser.password=undefined;
      this.newUser.username=undefined;
      this.modalRef.hide();
      this._userService.createUser(this.newUser).
       subscribe((userObj) =>{
        alert("You have Sucessfully Registered. Please login to continue.");
    }
    )
  }
}

 
  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
    // for (var index = this.currentPage*this._maxNo; index <  this._maxNo; index++) {
    //     this._blog[index] = this._blogs[index];
        
    //   }
  }
 
  public pageChanged(event: any): void {
        var nextIndex =(event.page-1)*event.itemsPerPage;
    //    var lastIndex = (this.totalItems > event.page +this.itemsPerPage) ? this.itemsPerPage :this.totalItems-nextIndex;
    //    for (var index = 0; index <  lastIndex; index++) {
    //     this._blog[index] = this._blogs[nextIndex];
    //    nextIndex = nextIndex + 1;
    //  }
    // this._blog.splice(lastIndex,this._blog.length-lastIndex);
    this._blogService.getblogsPaginationOld(nextIndex,this.itemsPerPage).
    subscribe((x)=>{
      this._blog=x;
    
    });
     
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    
  }
  openLogInModal(x)
 {
  
     this.openModal(this.logInModal);
 }
}
