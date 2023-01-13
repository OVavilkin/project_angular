import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url: string = "http://localhost:8080/BBooked/tours";

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

}
