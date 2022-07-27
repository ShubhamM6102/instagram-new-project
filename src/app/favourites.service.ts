import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favourite } from './product';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor( private http: HttpClient) { }
  public fetchFavourites():Observable<Favourite[]> {
    return this.http.get<Favourite[]>('https://instagram-344e5-default-rtdb.firebaseio.com/favourites.json');
  }
    
  updateFavourites(favourites: Favourite[]): void{
     this.http.put('https://instagram-344e5-default-rtdb.firebaseio.com/favourites.json',favourites)
     .subscribe();
     this.fetchFavourites();

  }
}
