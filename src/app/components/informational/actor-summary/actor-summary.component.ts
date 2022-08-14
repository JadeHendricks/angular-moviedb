import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastService } from 'src/app/services/cast/cast.service';
import { BaseService } from '../../../services/base/base.service';
import { Actor } from 'src/app/models/Actor';
import { Cast } from 'src/app/models/Cast';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-actor-summary',
  templateUrl: './actor-summary.component.html'
})
export class ActorSummaryComponent implements OnInit {
  
  private siteState: string = "";
  private id: string = "";

  public actor: Actor;
  public credits: Cast[];
  public gender: string = "";

  constructor(
    private route: ActivatedRoute, 
    private castService: CastService,
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.registerSubscriptions();
  }

  private registerSubscriptions(): void {
    this.getContentState();
    this.getActorAndCredits();
  }

  private getContentState(): void {
    this.baseService.contentState.subscribe((value: string) => {
      if (value) {
        this.siteState = value;
        this.siteState ? this.getActorAndCredits() : false; 
      }
    });
  }

  private getActorAndCredits(): void {
    forkJoin([
      this.castService.getActor(this.id),
      this.castService.getCredits(this.id)
    ]).subscribe(([actor, credits]) => {
      if (actor && credits && Object.keys(credits).length) {
        this.actor = actor;
        this.getGender(actor.gender);
        const inMostPopularOrder = credits.cast.sort((a: Cast, b: Cast) => b.popularity - a.popularity);
        this.credits = inMostPopularOrder;
      }
    });
  }
  
  private getGender(genderCode: number): void {
    this.gender = genderCode === 2 ? "Male" : "Female"
  }
}
