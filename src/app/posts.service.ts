import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post, Posts } from './product';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private http: HttpClient) { }
  public fetchPosts():Observable<Post[]> {
    return this.http.get<Post[]>('https://instagram-344e5-default-rtdb.firebaseio.com/posts.json');
  }
     public updatePosts(posts: Post[]):void{
    this.http.put("https://instagram-344e5-default-rtdb.firebaseio.com/posts.json",posts).subscribe();
    this.fetchPosts();

  }
  
    //   const Home =[];
    //   for(const key in res) {
    //     if(res.hasOwnProperty(key)){
    //       Home.push({...res[key], id: key})
    //     }
    //   }
    //   return Home;
    // }))
   
  }

