/*Created By: Sriya Banerjee
 Modified By: Sriya Banerjee
 */
import { Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import { LoginComponent } from './login.component';
import { Login } from './login';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService
{
    public userID : Observable<string>;
    
    constructor(private _http : Http)
    {
          
    }
    getToken(login :Login) : Observable<any>
    {
       return this._http.post("http://localhost:3000/api/accounts/login",{"username":login.username,"password":login.password})
       .map( (response : Response) => <any> response.json() ).catch(this.errorHandle);
    }
    logOut(): Observable<any>
    {
        let h = new Headers(); 
        h.append("x-access-token",localStorage.getItem('x-acess-token'));
        return this._http.post("http://localhost:3000/api/accounts/logout",null,{headers: h})
       .map( (response : Response) => <any> response.json() );
   }
   private errorHandle(error:Response)
    {
      
      console.error(error);
      return Observable.throw(error.json().error||'Server Error');
    }
}