import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastService } from 'src/app/services/cast/cast.service';
import { BaseService } from '../../../services/base/base.service';
import { Actor } from 'src/app/models/Actor';
import { Cast } from 'src/app/models/Cast';

@Component({
  selector: 'app-actor-summary',
  templateUrl: './actor-summary.component.html'
})
export class ActorSummaryComponent implements OnInit {
  
  siteState: string = "";
  id: string;
  actor: Actor;
  credits: Cast[];

  constructor(
    private route: ActivatedRoute, 
    private castService: CastService,
    private baseService: BaseService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this.baseService.contentState.subscribe((value: string) => {
      this.siteState = value;
      this.siteState ? this.getData() : false; 
    });
  }

  getData() : void {
    this.castService.getActor(this.id).subscribe(actor => this.actor = actor);
    this.castService.getCredits(this.id).subscribe(credits => {
      const inMostPopularOrder = credits.cast.sort((a: Cast, b: Cast) => b.popularity - a.popularity);
      this.credits = inMostPopularOrder;
    });
  }

  getGender(genderCode: number): string {
    return genderCode === 2 ? "Male" : "Female";
  }

}
