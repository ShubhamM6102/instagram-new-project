import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FavouritesService } from '../favourites.service';
import { MoreOptionsComponent } from '../more-options/more-options.component';
import { PostsService } from '../posts.service';
import { Bookmark, Favourite, Favourites, Post, Posts } from '../product';
import { ShareComponent } from '../share/share.component';
import { forkJoin} from 'rxjs';
import { LoginService } from '../login.service';
import { faV } from '@fortawesome/free-solid-svg-icons';
import { BookmarksService } from '../bookmarks.service';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input()
  isActive: boolean = false;
  Active: boolean= false;
  allPost: Post[] =[];
  favourites: Favourite[] =[];
  Likes : number = 0;
  bookmarks: Bookmark[] = [];
  loginEmail?: string;
  
 
  
  constructor( public bookmarksService: BookmarksService, public loginService: LoginService ,public postsService: PostsService,public favouritesService: FavouritesService, private sanitizer:DomSanitizer, private http: HttpClient, public  router:Router, public activatedroute: ActivatedRoute, public dialog: MatDialog) { }


  transform(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);            
  }
  ngOnInit(){
    const postobservable=this.postsService.fetchPosts();
    const favouriteobservable = this.favouritesService.fetchFavourites();
    const bookmarkobservable =  this.bookmarksService.fetchBookmarks();

    // const loginobservable = this.loginService.loggingUser.email;
    forkJoin({ postobservable,favouriteobservable,bookmarkobservable, }).subscribe(({ postobservable , favouriteobservable , bookmarkobservable } ) =>{
    //  const posts = res?[0]?.posts
      this.allPost= postobservable;
      this.favourites = favouriteobservable;
      this.bookmarks = bookmarkobservable;
      
      this.allPost = this.allPost.filter((post: Post)=> 
                 post.email === this.loginEmail
      )    

    })
    this.activatedroute.params.subscribe((params: Params)=>
    this.loginEmail = params['email']
    )
  }

  moreOption(){
    const dialogRef = this.dialog.open(MoreOptionsComponent, {
      width: '250px',
      height: '480px',
      
   
      
    }); 
    setTimeout(() => {
      dialogRef.close();
    }, 1000000);
  }

  shareOption(){
    const dialogRef = this.dialog.open(ShareComponent, {
      width: '250px',
      height: '450px'
    }); 
    setTimeout(() => {
      dialogRef.close();
    }, 10000);
  }

  commentOption(index: number){
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: '750px',
      height: '450px',
      data: {post: this.allPost[index]}
    }); 
    setTimeout(() => {
      dialogRef.close();
    }, 10000);
  }




  getFavourite(id: string): boolean{
    const post = this.favourites.filter((favourite: Favourite) => favourite.id === id)?.[0];
    return post ? (post.liked ? post.liked : false) : false;
  }

  getBookmark(id: string): boolean{
    const post = this.bookmarks.filter((bookmark: Bookmark) => bookmark.id === id)?.[0];
    return post ? (post.liked ? post.liked : false) : false;
  }
  // openDialog() {
  //   this.dialog.open(DialogDataExampleDialog, {
  //     // data: {
  //     //   // animal: 'panda'
  //     // },
  //   });
  // }

  // onProductsFetch(){
  //   this.fetchPosts();
  // }

  // onProductCreate(Home: {username: string, likes: string, post: string, profileImg:string}) {
  //   console.log(Home);
  //   this.http.post<{name: string}>('https://instagram-344e5-default-rtdb.firebaseio.com/Home.json', Home)
  //   .subscribe((res) => {
  //     console.log(res);

  //   });
  // }
  
    

  onClick(index: number, id: string) {
    const i = this.favourites.findIndex((favourite: Favourite) => favourite.id === id && favourite.email=== this.loginService.loggingUser.email );
   if(i > -1){
    this.favourites[i].liked =this.favourites[i].liked ? !this.favourites[i].liked:true;
    if(this.favourites[i].liked){
      this.allPost[index].likes++;
    }
    else{
      this.allPost[index].likes--;
    }
  }
  else {
    this.favourites.push(new Favourite(  this.loginService.loggingUser.email, id, true));
    this.allPost[index].likes++;
  }

   this.favouritesService.updateFavourites(this.favourites);
   this.postsService.updatePosts(this.allPost);
  }
  // onClick1() {
  //   this.Active =!this.Active;
  // }
  onClick1(index: number, id: string) {
    const i = this.bookmarks.findIndex((bookmark: Bookmark) => bookmark.id === id && bookmark.email=== this.loginService.loggingUser.email );
   if(i > -1){
    this.bookmarks[i].liked =this.bookmarks[i].liked ? !this.bookmarks[i].liked:true;
    if(this.bookmarks[i].liked){
      this.allPost[index].likes++;
    }
    else{
      this.allPost[index].likes--;
    }
  }
  else {
    this.bookmarks.push(new Favourite(  this.loginService.loggingUser.email, id, true));
    this.allPost[index].likes++;
  }

   this.bookmarksService.updateBookmarks(this.bookmarks);
   this.postsService.updatePosts(this.allPost);
  }

  videoIcon:string = "./assets/play.png";
  play:string = "Play";
  videodisabled:boolean = true;

  changeImg(){
    if(this.play == "Play")
    {
      this.play = "Pause",
      this.videoIcon = "./assets/pause.png",
      this.videodisabled = false
    }
    else
    {
      this.videoIcon = "./assets/play.png";
      this.play = "Play";
      this.videodisabled = true
    }
  }
}

