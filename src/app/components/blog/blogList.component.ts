import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BlogService } from 'app/services/blog.service';
import { Blog } from 'app/models/blog';
import { User } from 'app/models/user';

import { LoginService } from 'app/services/login.service';
import { UserService } from 'app/services/user.service';


/**
 * 
 * 
 * @export
 * @class BlogListComponent
 * @implements {OnInit}
 */
@Component({

  templateUrl: 'blogList.component.html',

  styleUrls: ['blogList.component.css']
})
export class BlogListComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal;
  @ViewChild('showModal') showModal;
  public _blog: Blog[];
  public singleBlog: Blog;
  public user;
  public users: User[];
  public modalRef: BsModalRef;
  public blog: Blog;
  public totalItems: number = 64;
  public itemsPerPage: number = 3;
  public currentPage: number = 1;
  public smallnumPages: number = 0;
  private _config = {

    backdrop: true,
    ignoreBackdropClick: true
  };
  constructor(private _blogService: BlogService, private _router: Router, private _loginService: LoginService, private _userService: UserService, private _modalService: BsModalService) {


  }
  ngOnInit() {
    if (!localStorage.getItem("userName")) {

      this._router.navigate(["home"]);

    }
    else {

      this.user = localStorage.getItem("userName");

      this._userService.countUserBlogs(localStorage.getItem("userID")).
        subscribe((x) => {
          this.totalItems = x.count;
        })


      this._userService.getUserBlogsWithPagination(localStorage.getItem("userID"), 0, this.itemsPerPage).
        subscribe((x) => {
          this._blog = x;
        })

    }


  }

  /**
   * 
   * 
   * @param {any} x 
   * @memberof BlogListComponent
   */
  doEdit(x) {

    if (x.userId == localStorage.getItem('userID')) {
      this._router.navigate(["edit", x.id]);

    }
    else {
      alert("You are not authorized to edit this blog");
    }
  }
  doShow(x) {
    this._blogService.getBlogWithCategory(x.id).subscribe(
      (blog) => {
        this.singleBlog = blog;
        this.openModal(this.showModal);
        
      }
    )

  }
  doConfirm(x) {
    if (x.userId == localStorage.getItem('userID')) {
      this.blog = x;
      this.openModal(this.deleteModal);

    }
    else {
      alert("You are not authorized to delete this blog");
    }


  }
  doHide() {
    this.modalRef.hide();
  }
  doDelete() {

    this.modalRef.hide();
    this._blogService.deleteBlog(this.blog).
      subscribe((x) => {
        this._blogService.getblogs().
          subscribe((x) => {
            this._blog = x;
          });
      });
  }
  doAdd() {
    this._router.navigate(["add"]);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template, this._config);
    console.log(this.modalRef);
  }
  modifyBlogLists() {
    alert();
  }
  public setPage(pageNo: number): void {
    this.currentPage = pageNo;

  }
  public pageChanged(event: any): void {
    var nextIndex = (event.page - 1) * event.itemsPerPage;
    this._userService.getUserBlogsWithPagination(localStorage.getItem("userID"), nextIndex, this.itemsPerPage).
      subscribe((x) => {
        this._blog = x;
      });
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
