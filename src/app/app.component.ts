/********************************************************************************* *
*  WEB422 – Assignment 06 * 
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this *
*  assignment has been copied manually or electronically from any other source (including web sites) or *
*  distributed to other students. * 
* Name: __Parita Sunilbhai Thakkar____ Student ID: __160107199__ Date: ___2022/04/06____
*
* Angular App (Deployed) Link: _____________________________________________________
*
* User API (Heroku) Link: _____https://secure-scrubland-41417.herokuapp.com/__________ 
* ********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Event,Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  token: any;
  searchQuery: string = "";

  constructor(private router: Router, private auth: AuthService) {}
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }

  logout(): void{
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  onSubmit(f:NgForm):void{
    this.router.navigate(['/search'], { queryParams: { artistName: this.searchQuery }});
    this.searchQuery= '';
  }
}
