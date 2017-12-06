import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { UserComponent } from 'app/components/users/user.component';
import { UserService } from 'app/services/user.service';
import { User } from 'app/models/user';

import { patternValidator } from 'app/shared/emailValidator.directive';


@Component({
  selector: 'register',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.css']
})
export class RegistrationComponent {

  public user: User;
  public duplicateUser: boolean;
  public newUser: User;
  private _id;
  RegistrationForm: FormGroup;
  public modalRef: BsModalRef;
  private _config = {

    backdrop: true,
    ignoreBackdropClick: true
  };

  @Input() childmodalRef: BsModalRef;
  constructor(private _router: Router, private _modalService: BsModalService, private _userService: UserService) {

    this.newUser = new User();

  }
  ngOnInit() {

    this.createForm();
  }

  private createForm() {
    this.RegistrationForm = new FormGroup({

      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  doHide() {

    this.childmodalRef.hide();
  }
  hi()
  {
    this._userService.IsUserExists(
        { "where": { "username": this.RegistrationForm.value.username } }
      ).
        subscribe((countUser) => {
          
          if ((countUser!="")) {
           this.duplicateUser=true;
          }
          else{
            this.duplicateUser=false;
          }
        }
        )
  }

  createNewUser() {
    if (this.RegistrationForm.controls['email'].errors || this.RegistrationForm.controls['password'].errors || this.RegistrationForm.controls['username'].errors) {
      alert("There are some Errors in the form. Please correct them before proceed.");
    }

    else {
      this.childmodalRef.hide();

      this._userService.IsUserExists(
        { "where": { "username": this.RegistrationForm.value.username } }
      ).
        subscribe((countUser) => {
          
          if ((countUser!="")) {
            alert("UserName Is Already Exist.");
          }
          else {
            this._userService.IsUserExists(
              { "where": { "email": this.RegistrationForm.value.email } }
            ).
              subscribe((countUser) => {

                if ((countUser!="")) {
                  alert("Email Is Already Exist.");
                }
                else {
                  this._userService.createUser(this.RegistrationForm.value).
                    subscribe((userObj) => {
                      alert("You have Sucessfully Registered. Please login to continue.");
                    }
                    )


                }
              }

              )

          }
        }
        )
    }
  }
}
