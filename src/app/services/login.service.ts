/*Created By: Sriya Banerjee
 Modified By: Sriya Banerjee
 */
import { Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LoginComponent } from 'app/components/login/login.component';
import { Login } from 'app/models/login';



@Injectable()
export class LoginService
{
    public userID : Observable<string>;
   
    public loggedIn = new BehaviorSubject<boolean>(false);
    
    constructor(private _http : Http)
    {
          
    }
    getToken(login :Login) : Observable<any>
    {
       return this._http.post("http://localhost:3000/api/accounts/login",{"username":login.username,"password":login.password})
       .map( (response : Response) => <any> response.json() ).catch(this.loginErrorHandle);
       
    }
    logOut(): Observable<any>
    {
        let h = new Headers(); 
        h.append("x-access-token",localStorage.getItem('x-acess-token'));
        return this._http.post("http://localhost:3000/api/accounts/logout",null,{headers: h})
       .map( (response : Response) => <any> response.json() );
   }
   changeLoggedIn(message: boolean) {
       
    this.loggedIn.next(message);
    console.log(this.loggedIn);
  }
   private errorHandle(error:Response)
    {
      
      console.error(error);
      return Observable.throw(error.json().error||'Server Error');
    }
    private loginErrorHandle(error:Response)
    {
      
      alert("Wrong Credentials!!Please Try Again Later.");
      return Observable.throw(error.json().error||'Server Error');
    }
}