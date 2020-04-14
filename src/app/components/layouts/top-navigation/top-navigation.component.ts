import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../../../services/base/base.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html'
})
export class TopNavigationComponent implements OnInit {

  query: string;
  modalState: string;

  constructor(
    private router: Router,
    private baseService: BaseService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.router.navigate([`/searchresults/${this.query}`]);
    this.query = "";
  }

  showModal(event: any): void {
    const modalState = event.srcElement.innerText.toLowerCase();
    this.baseService.showModal({hidden: false, state: modalState});
  }
}
