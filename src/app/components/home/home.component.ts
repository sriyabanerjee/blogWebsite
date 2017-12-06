import { Component, TemplateRef, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ReadMoreComponent } from 'app/components/readMore.component';

import { BlogService } from 'app/services/blog.service';
import { Blog } from 'app/models/blog';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {

  public blog: Blog[];
  public totalItems: number;
  public itemsPerPage: number = 3;
  public currentPage: number = 1;
  public smallnumPages: number = 0;
  private _blogs: Blog[];
  public filterBlog: string;
  public searchBlog: string;

  constructor(private _router: Router, private _blogService: BlogService) {

    this.blog = new Array<Blog>();
    this._blogs = new Array<Blog>();
  }
  ngOnInit() {

    this._blogService.countBlogs().
      subscribe((x) => {

        this.totalItems = x.count;
      });


    this._blogService.getblogsPagination(
      {
        "order": "creationTimeStamp DESC",
        "limit": this.itemsPerPage,
        "skip": 0
      }
    ).
      subscribe((x) => {
        this.blog = x;
        //this.sortBlog('name');
      });
  }


  public setPage(pageNo: number): void {
    this.currentPage = pageNo;

  }
  public pageChanged(event: any): void {
    var nextIndex = (event.page - 1) * event.itemsPerPage;
    if (this.searchBlog == null) {
      this._blogService.getblogsPagination(
        {
          "order": "creationTimeStamp DESC",
          "limit": this.itemsPerPage,
          "skip": nextIndex
        }
      ).
        subscribe((x) => {
          // this.totalItems = x.length;
          // this.currentPage = 1;
          this.blog = x;

        });
    }
    else {
      this._blogService.getblogsPagination(
        {

          "order": "creationTimeStamp DESC",
          "limit": this.itemsPerPage,
          "skip": nextIndex,
          "where": { "name": { "like": "%" + this.searchBlog + "%" } }
        }
      ).
        subscribe((x) => {
          this.blog = x;

        });
    }


    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);

  }
  public searchBlogs() {

    if (this.searchBlog == "") {
      this._blogService.getblogsPagination(
        {
          "order": "creationTimeStamp DESC",

        }
      ).
        subscribe((x) => {
          this.totalItems = x.length;
          this.currentPage = 1;

        });
      this._blogService.getblogsPagination(
        {
          "order": "creationTimeStamp DESC",
          "limit": this.itemsPerPage,
          "skip": 0
        }
      ).
        subscribe((x) => {

          this.blog = x;

        });
    }
    else {
      this._blogService.getblogsPagination(
        {

          "order": "creationTimeStamp DESC",

          "where": { "name": { "like": "%" + this.searchBlog + "%" } }
        }
      ).
        subscribe((x) => {
          this.totalItems = x.length;
          this.currentPage = 1;

        });
      this._blogService.getblogsPagination(
        {

          "order": "creationTimeStamp DESC",
          "limit": this.itemsPerPage,
          "skip": 0,
          "where": { "name": { "like": "%" + this.searchBlog + "%" } }
        }
      ).
        subscribe((x) => {

          this.blog = x;

        });

    }
  }
}
