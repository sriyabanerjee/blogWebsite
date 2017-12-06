import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BlogService } from 'app/services/blog.service';
import { Blog } from 'app/models/blog';

import { LoginService } from 'app/services/login.service';
import { CatagoryService } from 'app/services/catagory.service';
import { Catagory } from 'app/models/catagory';


@Component({

  templateUrl: 'blogAdd.component.html',
  styleUrls: ['blogList.component.css', 'blogEdit.component.css']

})
export class BlogAddComponent implements OnInit {
  @ViewChild('messageModal') messageModal;
  public blog: Blog;
  public user;
  public catagories: Catagory[];
  public catagory: Catagory;
  private _modalRef: BsModalRef;
  constructor(private _blogService: BlogService, private _route: ActivatedRoute, private _router: Router, private _loginService: LoginService, private _modalService: BsModalService, private _catagoryService: CatagoryService) {

    this.user = localStorage.getItem("userName");
    this.blog = new Blog();
    this.blog.userId = localStorage.getItem('userID');
    this.blog.userName = localStorage.getItem('userName');
  }
  ngOnInit() {

    if (!localStorage.getItem("userName")) {
      this.openModal(this.messageModal);

    }
    else {
      this._catagoryService.getAllCatagories().
        subscribe((x) => {
          this.catagories = x;
        })

    }
  }
  public openModal(template: TemplateRef<any>) {
    this._modalRef = this._modalService.show(template);
  }
  doHide() {

    this._modalRef.hide();
    this._router.navigate(["\home"]);
  }
  doAdd() {

    if (this.blog.name == null) {
      alert("Please Enter Blog Subject");
    }
    else if (this.blog.name.length < 5) {
      alert("Subject must be atleast 5 characters long");
    }
    else if (this.blog.description.length < 50) {
      alert("Blog must be atleast 50 characters long");
    }
    else if (this.blog.description == null) {
      alert("Please Enter Blog Description");
    }
    else if (this.blog.catagoryId == null) {
      alert("Please Choose Category");
    }
    else {

      this._blogService.addBlog(this.blog).
        subscribe((x) => {

          this._router.navigate(["\list"]);

        });

    }
  }
  doCancel() {
    this._router.navigate(["\list"]);
  }
  doLogOut() {
    this._loginService.logOut().
      subscribe((x) => {
        localStorage.removeItem('x-acess-token');
        localStorage.removeItem('userID');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        this._router.navigate(["login"]);
      }
      )
  }

}
