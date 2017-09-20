import { Component,OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  
  templateUrl: 'user.component.html',
  
})
export class UserComponent implements OnInit {
  public user : User;
  
  constructor( private _userService : UserService ,private route: ActivatedRoute,private router: Router)
  {
       
  
 this.user=new User();
  
  } 
 ngOnInit()
 {
     
   
  this.route.paramMap
    .switchMap((params: ParamMap) =>
      this._userService.getUser(params.get('id')))
    .subscribe((user: User) => this.user = user);
 }

 getUserDetails(id) : User
 {
     this._userService.getUser(id).
     subscribe((user: User) => this.user = user);
     return this.user;
 }

 
   
   
 
  
}
