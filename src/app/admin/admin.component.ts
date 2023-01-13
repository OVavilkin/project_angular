import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatListModule } from '@angular/material/list'; 

import { User } from '../user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];

  constructor(
    private http: HttpClient
  ) { 
    this.http.get<User[]>("http://localhost:8080/BBooked/account/getUsers")
    .subscribe(users => {
      if(users == null) {
        console.log('Got null users?!');
      } else {
        this.users = users;
        console.log('Users: ', users);
      }
    });

  }


  ngOnInit(): void {
  }

  block(user: User) {
    return this.http.get('http://localhost:8080/BBooked/account/block?id=' + user.id)
    .subscribe(() => {
      user.blocked = !user.blocked;
      console.log("User (un)blocked");
    });

  }

}
