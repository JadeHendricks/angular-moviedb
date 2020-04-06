import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastService } from 'src/app/services/cast/cast.service';

@Component({
  selector: 'app-actor-summary',
  templateUrl: './actor-summary.component.html'
})
export class ActorSummaryComponent implements OnInit {

  actor: any;
  credits: any;

  constructor(private route: ActivatedRoute, private castService: CastService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");

    this.castService.getActor(id).subscribe(actor => this.actor = actor);
    this.castService.getCredits(id).subscribe(credits => {
      const inMostPopularOrder = credits.cast.sort((a: any, b: any) => b.popularity - a.popularity);
      this.credits = inMostPopularOrder;
    });
  }

  getGender(genderCode: number): string {
    return genderCode === 2 ? "Male" : "Female";
  }

}
