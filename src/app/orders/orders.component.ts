import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  url: string = "http://localhost:8080/BBooked/orders";

  constructor() { }

  ngOnInit(): void {
  }

}
