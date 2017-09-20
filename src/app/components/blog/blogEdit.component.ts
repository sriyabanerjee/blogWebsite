import { Component,OnInit,TemplateRef,ViewChild, ElementRef} from '@angular/core';
import { BlogService } from './blog.service';
import { Blog } from './blog';
import {LoginService} from 'app/components/login/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';


@Component({
  
  templateUrl: 'blogEdit.component.html',
  styleUrls: ['blogList.component.css','blogEdit.component.css']
  
})
export class BlogEditComponent implements OnInit {
  @ViewChild('sriya') sriya;
//   @ViewChild('sriya') 
//    set sriya(ref: any) {
//   console.log(ref);
//   alert();
// }
  public blog : Blog;
  public show: boolean = false;
  public modalRef: BsModalRef;
  public user;
  constructor( private _blogService : BlogService ,private route: ActivatedRoute,private router: Router, private modalService: BsModalService, private _loginService : LoginService)
  {
      
  this.user=localStorage.getItem("userName");
 this.blog=new Blog();
  
  } 
  set lookUp(ref: any) {
  console.log(ref);
}
 ngOnInit()
 {
   
  this.route.paramMap
    .switchMap((params: ParamMap) =>
      this._blogService.getBlog(params.get('id')))
    .subscribe((blog: Blog) => this.blog = blog);
 }
//  ngAfterViewInit() {
//     alert(this.sriya);
//   }
 doEdit()
 {
  
   this._blogService.editBlog(this.blog).
   subscribe((x)=>{
     this.show=true;
     
     alert("You have sucessfully edited the blog");
     //this.openModal(this.sriya);
     this.router.navigate(["\list"]); 
      
    });
    
   
 }
 public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  doLogOut()
{
  this._loginService.logOut().
  subscribe((x) =>{
    localStorage.removeItem('x-acess-token');
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    this.router.navigate(["login"]);
  }
  )
} 
  
}
