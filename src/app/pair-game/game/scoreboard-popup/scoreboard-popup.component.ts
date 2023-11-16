import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-scoreboard-popup',
  templateUrl: './scoreboard-popup.component.html',
  styleUrls: ['./scoreboard-popup.component.scss'],
})
export class ScoreboardPopupComponent implements OnInit {
  constructor(public popupService: PopupService) {}
  ngOnInit() {
    this.popupService.popupState$.subscribe();
  }

  closePopup() {
    this.popupService.closePop();
  }

  @Input() scorePlayers: Player[] = [];
}
