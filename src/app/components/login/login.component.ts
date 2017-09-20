import { Component,TemplateRef } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { LoginService } from './login.service';
import { UserComponent } from 'app/components/users/user.component';
import { UserService } from 'app/components/users/user.service';
import { Login } from './login';
import { User } from 'app/components/users/user';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  public login;
  public user : User;
  public newUser : User;
  private id;
  public modalRef: BsModalRef;
  public config = {
    
    backdrop: true,
    ignoreBackdropClick: true
  };
    
  constructor( private _loginService : LoginService, private _router : Router, private modalService: BsModalService,private _userService : UserService)
  {
      this.login = new Login();
      this.newUser = new User();
      
  }
  getToken()
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
          this._router.navigate(["list"]);
          }
          )
        });
  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }
  doHide()
  {
    this.newUser.email=undefined;
    this.newUser.password=undefined;
    this.newUser.username=undefined;
    this.modalRef.hide(); 
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
}
