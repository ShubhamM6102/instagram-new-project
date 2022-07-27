import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PostsService } from '../posts.service';
import { DialogData, Post } from '../product';
import { Comment } from '../product';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
@Input()
  allPost: Post[] =[];
  comments: Comment[]=[];
  isActive!: boolean;
  like?: boolean ;
  post? : Post;

  constructor(public dialogRef: MatDialogRef< CommentsComponent>, public postsService: PostsService,@Inject (MAT_DIALOG_DATA) public data: DialogData
    ) {
      this.postsService.fetchPosts().subscribe((posts: Post[]) => {
        this.allPost = posts;
    })
     }
  

  ngOnInit() {
    this.post = this.data.post;
    this.dialogRef.updatePosition({ top: `30px`,
    right: `400px`});
  }
  onClick(index: number ) {
    this.comments[index].like =!this.comments[index].like;
    
   
  }
}
