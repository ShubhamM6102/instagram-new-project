import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../login.service';
import { MailService } from '../mail.service';
import { PostsService } from '../posts.service';
import { Post, User } from '../product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  users?: User[];
  loginEmail?: string;
  allPost: Post[] =[];
  isActive: boolean = false;
 
  constructor(public loginService:LoginService, public postService: PostsService, public activatedroute: ActivatedRoute, public mailService: MailService ) { 
 this.mailService.getUsers().subscribe((user: User[])=>
      this.users = user
  )
  }

  ngOnInit(): void {
  
    this.allPost = this.allPost.filter((post: Post)=> 
    post.email === this.loginEmail
    )
    this.activatedroute.params.subscribe((params: Params)=>
    this.loginEmail = params['email']
  )}
  onClick() {
    this.isActive =!this.isActive;
  }
}
