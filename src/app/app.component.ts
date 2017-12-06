import { Component,TemplateRef,OnInit,ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import {LoginService} from 'app/services/login.service';
import { Login } from 'app/models/login';
import { UserService } from 'app/services/user.service';
import { User } from 'app/models/user';

@Component({
  selector: 'app-root',
  templateUrl: 
'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public login;
  public loggedIn;
  public userName : String;
  public user : User;
  public newUser : User;
  private _id;
  public modalRef: BsModalRef;
  public config = {
    
    backdrop: true,
    ignoreBackdropClick: true
  };
    @ViewChild('loginModal') logInModal;  
     @ViewChild('newUserRegistration') newUserRegistration; 
  constructor(private _loginService : LoginService, private _router : Router, private _modalService: BsModalService, private _userService : UserService)
  {
    this.login = new Login();
  }
  ngOnInit()
 {
  
   this.userName=localStorage.getItem('userName');
   if(localStorage.getItem('x-acess-token'))
   {
this.updateLoggedIn();
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
    this._router.navigate(["home"]);
    this.loggedIn=false;
  }
  )
}
updateLoggedIn(){
  
  this.loggedIn=true;
  this.userName=localStorage.getItem('userName');
   
} 

public openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template,this.config);
  }
   openLogInModal()
 {
  
     this.openModal(this.logInModal);
 }
  openRegistrationModal()
 {
  
     this.openModal(this.newUserRegistration);
 }
 doHide()
  {
    // this.newUser.email=undefined;
    // this.newUser.password=undefined;
    // this.newUser.username=undefined;
    this.modalRef.hide(); 
  }
  // getToken()
  // {
  //      this._loginService.getToken(this.login).
  //      subscribe((x) =>{
         
  //       this. _id=x.userId;
  //       localStorage.setItem('x-acess-token',x.id);
  //       localStorage.setItem('userID',x.userId);
  //       this._userService.getUser(this. _id).
  //       subscribe((user) =>{
  //         this.user=user;
  //         localStorage.setItem('userName',this.user.username);
  //         localStorage.setItem('userEmail',this.user.email);
  //         this._router.navigate(["list"]);
  //         }
  //         )
  //          this._loginService.loggedIn.subscribe(
  //           function (x) {
  //             this.isLoggedin=x;
        
  //           })
  //       });
  // }
   
}
