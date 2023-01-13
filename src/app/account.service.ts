import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private pUser: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    var localUser = localStorage.getItem('user');
      var guest = new User();
      guest.username = 'Guest';
      this.pUser = new BehaviorSubject<User>(guest);
  //

    console.log("Current user is :", this.pUser.value);
    this.user = this.pUser.asObservable();

    // maybe we are already logged in?
    this.http.get<User>("http://localhost:8080/BBooked/account/getUser")
    .subscribe(user => {
      if(user == null) {
        console.log('Got null user?!');
        //some error magic
      } else {
        localStorage.setItem('user', JSON.stringify(user));
        this.pUser.next(user);
        console.log('User already logged in: ', user);
      }
    });

  }

  public get userValue(): User {
    console.log("Called get userValue() ", this.pUser.value);
    return this.pUser.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>('http://localhost:8080/BBooked/account/login', {username, password})
    .pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      if(user == null) {
        //some error magic
      } else {
        this.pUser.next(user);
      }
      console.log('User logged in: ', user);
      this.router.navigate(['']);
      // reload iframe since we have logged out
      //document.getElementById('listTours')!.contentWindow.location.reload();
      document.querySelector<HTMLIFrameElement>('listTours')!.contentWindow!.location.reload();
      return user;
    }));
  }

  register(username: string, password: string, email: string) {
    return this.http.post<User>('http://localhost:8080/BBooked/account/register', {username, password, email})
    .pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      if(user == null) {
        alert("Such user exists");
      } else if (user.error) {
        alert("Unable to register: " + user.error);
      } else {
        this.pUser.next(user);
        this.router.navigate(['']);
      }
      console.log('User logged in: ', user);
      // reload iframe since we have logged out
      //document.getElementById('listTours')!.contentWindow.location.reload();
      document.querySelector<HTMLIFrameElement>('listTours')!.contentWindow!.location.reload();
      return user;
    }));
  }



  logout() {
    localStorage.removeItem('user');
    var guest = new User();
    guest.username = 'Guest';
    this.pUser.next(guest);
    this.router.navigate(['']);

    this.http.get("http://localhost:8080/BBooked/account/logout")
    .subscribe(data => {
      location.reload();
    });

  }

  editUser(username: string, password: string) {
    return this.http.post<User>('http://localhost:8080/BBooked/account/editUser', {username, password})
    .pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.pUser.next(user);
      console.log(user);
      return user;
    }));
  }


}
