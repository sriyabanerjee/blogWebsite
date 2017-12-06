import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
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

  templateUrl: 'blogEdit.component.html',
  styleUrls: ['blogList.component.css', 'blogEdit.component.css']

})
export class BlogEditComponent implements OnInit {
  public blog: Blog;
  public show: boolean = false;
  public modalRef: BsModalRef;
  public user;
  public catagories: Catagory[];
  public catagory: Catagory;
  constructor(private _blogService: BlogService, private _route: ActivatedRoute, private _router: Router, private _modalService: BsModalService, private _loginService: LoginService, private _catagoryService: CatagoryService) {

    this.user = localStorage.getItem("userName");
    this.blog = new Blog();
    this.catagory = new Catagory();

  }

  ngOnInit() {

    this._route.paramMap
      .switchMap((params: ParamMap) =>
        this._blogService.getBlogWithCategory(params.get('id')))
      .subscribe((blog: Blog) => {
        this.blog = blog;

      }
      );

    this._catagoryService.getAllCatagories().
      subscribe((x) => {
        this.catagories = x;
        console.log(JSON.stringify(this.catagories));
      })

  }

  doEdit() {

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
      this._blogService.editBlog(this.blog).
        subscribe((x) => {
          this.show = true;
          alert("You have sucessfully edited the blog");
          this._router.navigate(["\list"]);

        });

    }
  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
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
