import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { User } from 'app/models/user';

@Injectable()
export class UserService {
  constructor(private _http: Http) {

  }

  getUser(id): Observable<User> {

    let h = new Headers();

    h.append("x-access-token", localStorage.getItem('x-acess-token'));

    let user = this._http.get("http://localhost:3000/api/accounts/" + id,
      { headers: h }).map((response: Response) => response.json() as User);
    return user;
  }
  getUserBlogsWithPagination(id, skipBlog, total): Observable<any> {

    let h = new Headers();

    h.append("x-access-token", localStorage.getItem('x-acess-token'));

    let blogs = this._http.get("http://localhost:3000/api/accounts/" + id + "/accountTroughBlog?filter[include]=catagory&filter[limit]=" + total + "&filter[skip]=" + skipBlog,
      { headers: h }).map((response: Response) => response.json());

    return blogs;
  }
  getUserblogsPagination(id, parameter): Observable<any[]> {
    let h = new Headers();

    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    let x = this._http.get("http://localhost:3000/api/accounts/" + id + "/accountTroughBlog?filter=" + encodeURI(JSON.stringify(parameter)),
      { headers: h }).map((response: Response) => <any[]>response.json());

    return x;
  }
  getAllUsers(): Observable<User[]> {

    let h = new Headers();
    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    let x = this._http.get("http://localhost:3000/api/accounts",
      { headers: h }).map((response: Response) => <User[]>response.json());

    return x;
  }
  createUser(user: any): Observable<User> {

    let h = new Headers();

    h.append("x-access-token", localStorage.getItem('x-acess-token'));

    return this._http.post("http://localhost:3000/api/accounts/", user,
      { headers: h }).map((response: Response) => response.json() as User).catch(this.errorHandle);


  }
  countUserBlogs(id): Observable<any> {
    let h = new Headers();
    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    let count = this._http.get("http://localhost:3000/api/accounts/" + id + "/accountTroughBlog/count",
      { headers: h }).map((response: Response) => <any>response.json());

    return count;
  }
  IsUserExists(parameter):Observable<any> {
    
    let h = new Headers();
    h.append("x-access-token", localStorage.getItem('x-acess-token'));
    let count = this._http.get("http://localhost:3000/api/accounts?filter=" + JSON.stringify(parameter),
      { headers: h }).map((response: Response) => <any>response.json()).catch(this.userRrrorHandle);

    return count;
  }
   private errorHandle(error:Response)
    {
      
      alert("OOPS!! Something is Went Wrong. Please Try Again Later.");
      return Observable.throw(error.json().error||'Server Error');
    }
     private userRrrorHandle(error:Response)
    {
      
      alert("OOPS!! .");
      return Observable.throw(error.json().error||'Server Error');
    }

}


