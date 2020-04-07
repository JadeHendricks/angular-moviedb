import { Component, OnInit, Input } from '@angular/core';
import { Cast } from 'src/app/models/Cast';

@Component({
  selector: 'app-cast-card',
  templateUrl: './cast-card.component.html'
})
export class CastCardComponent implements OnInit {
  @Input() castMember: Cast;

  constructor() { }

  ngOnInit(): void {

  }

}
