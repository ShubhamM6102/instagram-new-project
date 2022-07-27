import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookmark, Bookmarks, Favourite } from './product';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  constructor( private http: HttpClient) { }
  public fetchBookmarks():Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>('https://instagram-344e5-default-rtdb.firebaseio.com/bookmarks.json');
  }
    
  updateBookmarks(bookmarks: Bookmark[]): void{
     this.http.put('https://instagram-344e5-default-rtdb.firebaseio.com/bookmarks.json',bookmarks)
     .subscribe();
     this.fetchBookmarks();

  }
}
