import { Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
//import { LoginComponent } from './login.component';
import { User } from './user';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService
{
   constructor(private _http : Http)
    {
          
    }
    
    getUser(id): Observable<User>{
      
      let h = new Headers(); 
      
      h.append("x-access-token",localStorage.getItem('x-acess-token'));
      
      let user =  this._http.get("http://localhost:3000/api/accounts/"+id,
        {headers: h}).map( (response : Response) =>  response.json() as User);
        
       
       return user;
    }
    getAllUsers(): Observable<User[]>{
      
      let h = new Headers();
        h.append("x-access-token",localStorage.getItem('x-acess-token'));
        let x= this._http.get("http://localhost:3000/api/accounts",
        {headers: h}).map( (response : Response) => <User[]> response.json());
        
       return x;
    }
    createUser(user :User):Observable<User>{
      
      let h = new Headers(); 
      
      h.append("x-access-token",localStorage.getItem('x-acess-token'));
      
      return  this._http.post("http://localhost:3000/api/accounts/",user,
        {headers: h}).map( (response : Response) =>  response.json() as User);
        
       
       
    }
    
        
}

    
