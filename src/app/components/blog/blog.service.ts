import { Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
//import { LoginComponent } from './login.component';
import { Blog } from './blog';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class BlogService
{
   constructor(private _http : Http)
    {
          
    }
    getblogs() : Observable<Blog[]>
    {
        let h = new Headers();
        h.append("x-access-token",localStorage.getItem('x-acess-token'));
        let x= this._http.get("http://localhost:3000/api/Blogs",
        {headers: h}).map( (response : Response) => <Blog[]> response.json());
        
       return x;
    }
    getBlog(id): Observable<Blog>{
      
      let h = new Headers(); 
      
      h.append("x-access-token",localStorage.getItem('x-acess-token'));
      //h.append("Content-Type","application/x-www-form-urlencoded");
      let x =  this._http.get("http://localhost:3000/api/Blogs/"+id,
        {headers: h}).map( (response : Response) =>  response.json() as Blog);
        
       
       return x;
    }
    editBlog(blog) : Observable<string>
    {
      
      let h = new Headers(); 
      h.append("x-access-token",localStorage.getItem('x-acess-token'));
      //this._http.put("http://localhost:3000/api/Blogs/"+blog.id,JSON.stringify(blog),{headers: h});
       return this._http.put("http://localhost:3000/api/Blogs/"+blog.id,blog,{headers: h}).map((response : Response) =>  <string> response.json().name)
       .catch(this.errorHandle); 
          
    }
    deleteBlog(blog) : Observable<Number>
    {
      
      let h = new Headers(); 
      h.append("x-access-token",localStorage.getItem('x-acess-token'));
       return this._http.delete("http://localhost:3000/api/Blogs/"+blog.id,{headers: h}).map((response : Response) =>  <string> response.json().count)
       .catch(this.errorHandle); 
    }
    addBlog(blog) : Observable<string>
    {
      
      let h = new Headers(); 
      h.append("x-access-token",localStorage.getItem('x-acess-token'));
      //this._http.put("http://localhost:3000/api/Blogs/",JSON.stringify(blog),{headers: h});
       return this._http.post("http://localhost:3000/api/Blogs/",blog,{headers: h}).map((response : Response) =>  <string> response.json().name)
       .catch(this.errorHandle); 
          
    }
    private errorHandle(error:Response)
    {
      
      console.error(error);
      return Observable.throw(error.json().error||'Server Error');
    }
        
}

    
