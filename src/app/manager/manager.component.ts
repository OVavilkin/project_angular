import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  url: string = "http://localhost:8080/BBooked/manager";

  constructor() { }

  ngOnInit(): void {
  }

}
