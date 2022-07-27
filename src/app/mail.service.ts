import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewUsers, Posts, User } from './product';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  users: BehaviorSubject<User[]>;
  users$: Observable<User[]>;

  constructor(public httpClient:HttpClient) { 
    this.users= new BehaviorSubject<User[]>([]);
    this.users$= this.users.asObservable();
  }

  // public addUser(users: NewUsers):void{
  //   this.httpClient.patch("https://instagram-344e5-default-rtdb.firebaseio.com/users.json",users).subscribe();
  //   this.users.next(users.users);

  // }
 
public getUsers():Observable<User[]>{
  // return this.users.value;
  return this.httpClient.get<User[]>("https://instagram-344e5-default-rtdb.firebaseio.com/users.json");
}
  
}
