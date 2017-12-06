import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Blog } from 'app/models/blog';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BlogService {
  constructor(private _http: Http) {

  }
  getblogsPaginationOld(skipBlog, total): Observable<Blog[]> {
    let h = new Headers();
    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    let x = this._http.get("http://localhost:3000/api/Blogs?filter[limit]=" + total + "&filter[skip]=" + skipBlog,
      { headers: h }).map((response: Response) => <Blog[]>response.json());

    return x;
  }
  getblogsPagination(parameter): Observable<Blog[]> {
    let h = new Headers();

    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    let x = this._http.get("http://localhost:3000/api/Blogs?filter=" + encodeURI(JSON.stringify(parameter)),
      { headers: h }).map((response: Response) => <Blog[]>response.json());

    return x;
  }
  getblogs(): Observable<Blog[]> {
    let h = new Headers();
    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    let x = this._http.get("http://localhost:3000/api/Blogs",
      { headers: h }).map((response: Response) => <Blog[]>response.json());

    return x;
  }
  getblogsWithCategory(): Observable<Blog[]> {
    let h = new Headers();
    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    let x = this._http.get("http://localhost:3000/api/Blogs?filter[include]=catagory",
      { headers: h }).map((response: Response) => <Blog[]>response.json());


    return x;
  }
  getBlog(id): Observable<Blog> {

    let h = new Headers();

    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    //h.append("Content-Type","application/x-www-form-urlencoded");
    let x = this._http.get("http://localhost:3000/api/Blogs/" + id,
      { headers: h }).map((response: Response) => response.json() as Blog);


    return x;
  }
  /**
   * 
   * 
   * @param {any} id 
   * @returns {Observable<any>} 
   * @memberof BlogService
   */
  getBlogWithCategory(id): Observable<any> {

    let h = new Headers();

    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    //h.append("Content-Type","application/x-www-form-urlencoded");
    let x = this._http.get("http://localhost:3000/api/Blogs/" + id + "?filter[include]=catagory",
      { headers: h }).map((response: Response) => response.json() as Blog);


    return x;
  }
  editBlog(blog): Observable<string> {

    let h = new Headers();
    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    //this._http.put("http://localhost:3000/api/Blogs/"+blog.id,JSON.stringify(blog),{headers: h});
    return this._http.put("http://localhost:3000/api/Blogs/" + blog.id, blog, { headers: h }).map((response: Response) => <string>response.json().name)
      .catch(this.errorHandle);

  }
  deleteBlog(blog): Observable<Number> {

    let h = new Headers();
    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    return this._http.delete("http://localhost:3000/api/Blogs/" + blog.id, { headers: h }).map((response: Response) => <string>response.json().count)
      .catch(this.errorHandle);
  }
  addBlog(blog): Observable<string> {

    let h = new Headers();
    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    //this._http.put("http://localhost:3000/api/Blogs/",JSON.stringify(blog),{headers: h});
    return this._http.post("http://localhost:3000/api/Blogs/", blog, { headers: h }).map((response: Response) => <string>response.json().name)
      .catch(this.errorHandle);

  }
  countBlogs(): Observable<any> {
    let h = new Headers();
    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    let x = this._http.get("http://localhost:3000/api/blogs/count",
      { headers: h }).map((response: Response) => <any>response.json());

    return x;
  }
  countFilteredBlogs(parameter): Observable<any> {
    let h = new Headers();

    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    let x = this._http.get("http://localhost:3000/api/blogs/count?filter=" + encodeURI(JSON.stringify(parameter)),
      { headers: h }).map((response: Response) => <any>response.json());

    return x;
  }
  private errorHandle(error: Response) {

    console.error(error);
    return Observable.throw(error.json().error || 'Server Error');
  }

}


