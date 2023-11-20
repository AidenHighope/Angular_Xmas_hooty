import { Component, Input } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  constructor(public popupService: PopupService) {}
  ngOnInit() {
    this.popupService.popupState$.subscribe();
  }

  closePopup() {
    this.popupService.closePop();
  }

  @Input() scorePlayers: Player[] = [];
}
