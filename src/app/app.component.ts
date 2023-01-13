import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bbooked';
  user: User;
  Message = "Parent to Child";

  constructor(
    private accountService: AccountService
  ) {
  }

  logout() {
    console.log("LOGOUT CALLED (app.components)")
    this.accountService.logout();
  }

  home() {
    let iframe = document.getElementById('listTours') as HTMLIFrameElement;
    iframe.src = './tours';
  }

  orders() {
    let iframe = document.getElementById('orders') as HTMLIFrameElement;
    iframe.src = './orders';
  }


  ngOnInit() {
    this.accountService.user.subscribe( user => this.user = user);
  }
  
}
