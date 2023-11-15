import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-scoreboard-popup',
  templateUrl: './scoreboard-popup.component.html',
  styleUrls: ['./scoreboard-popup.component.scss'],
})
export class ScoreboardPopupComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  triggerChangeDetection() {
    this.cdr.detectChanges();
  }
  @Input() scorePlayers: Player[] = [];
}
