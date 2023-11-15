import { Component, Input } from '@angular/core';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-scoreboard-popup',
  templateUrl: './scoreboard-popup.component.html',
  styleUrls: ['./scoreboard-popup.component.scss'],
})
export class ScoreboardPopupComponent {
  @Input() scorePlayers: Player[] = [];
}
