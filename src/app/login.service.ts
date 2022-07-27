import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MailService } from './mail.service';
import { NewUsers, User } from './product';




@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  
  user?: User;
  users?: User[];

  loggingUser:User= {} as User;

  constructor(private mailsService: MailService, public router: Router) {
    this.mailsService.getUsers().subscribe((users:User[])=>{this.users=users})
  }
  public validate(): boolean {
    const users = this.users;
    if(users){
      const index = users.findIndex(
        (user: User) =>
          user.email === this.loggingUser.email &&
          user.password === this.loggingUser?.password
      );
      if (index !== -1) {
        this.user = users[index];
        return true;
      } else {
        return false;
      }
    }
    return false;
    }


  updateLoginUser(email: string, password: string) {
    this.loggingUser.email = email;
    this.loggingUser.password = password;
    this.router.navigate(['/home',email]);
    
  }
}
