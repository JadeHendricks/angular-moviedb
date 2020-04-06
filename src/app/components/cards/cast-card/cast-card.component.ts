import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cast-card',
  templateUrl: './cast-card.component.html'
})
export class CastCardComponent implements OnInit {
  @Input() castMember: any;

  constructor() { }

  ngOnInit(): void {

  }

}
