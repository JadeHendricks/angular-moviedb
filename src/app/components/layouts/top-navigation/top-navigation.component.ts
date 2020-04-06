import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html'
})
export class TopNavigationComponent implements OnInit {

  query: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.router.navigate([`/searchresults/${this.query}`]);
    this.query = "";
  }

}
