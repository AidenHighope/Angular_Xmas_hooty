import { Component, OnInit } from '@angular/core';
import { Link } from '../models/links';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  links!: Link[];
  ngOnInit(): void {
    this.links = [
      { title: 'Home', url: '/home' },
      { title: 'Jeux des paires', url: 'pair-game' },
      { title: 'La bûche', url: 'shopping-list' },
      { title: 'Le quiz', url: 'api-quiz' },
    ];
  }
  toggleLink(link: Link): void {
    link.isVisible = true;
  }

  clearLink(): void {
    for (let link of this.links) {
      link.isVisible = false;
    }
  }
}
