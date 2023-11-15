import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Cards } from 'src/app/models/Card';
import { CardService } from 'src/app/shared/services/card.service';
import { Player } from 'src/app/models/Player';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  constructor(private cardService: CardService) {}
  //#region GLOBAL
  //------------ variables/declaration global --------------
  isVisible: boolean = true;
  popup: boolean = true;
  //------------ methodes/global logique --------------

  toggleIsVisible(): void {
    this.isVisible = !this.isVisible;
  }

  togglePopup(): void {
    this.popup = !this.popup;
  }
  //#endregion

  //#region GAME LOGIC
  //------------ variables/declaration game --------------
  buttonRestartTxt: string = 'au suivant !';

  userInput: string = '';

  goodToGo: boolean = false;

  nextTurn: boolean = false;

  flippedCards: Cards[] = [];

  get cards(): Cards[] {
    return this.cardService.cards;
  }

  get players(): Player[] {
    return this.cardService.players;
  }

  sortedPlayers = this.players.slice().sort((a, b) => b.score - a.score);
  index: number = 0;
  turncount: number = this.players.length;

  //------------ methodes/game logique --------------
  addNewPlayer(input: string): void {
    let newPlayer = { name: input, score: 0, isPlaying: true };
    this.players.push(newPlayer);
  }

  toggleGTG(): void {
    this.goodToGo = true;
  }

  flipCard(card: Cards): void {
    if (!card.isFlipped && this.flippedCards.length < 2) {
      this.cardService.flipCard(card);
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        setTimeout(() => this.checkMatch(), 1000);
      }
    }
  }

  private checkMatch(): void {
    let currentPlayer = this.players[this.index];
    if (this.cardService.checkMatch(this.flippedCards)) {
      currentPlayer.score += 15;
    } else {
      if (currentPlayer.score > 0) {
        currentPlayer.score -= 5;
      } else if (currentPlayer.score < 0) {
        currentPlayer.score = 0;
      }
      this.flippedCards.forEach((card) => this.cardService.flipCard(card));
    }
    if (this.cards.every((card) => card.isFlipped)) {
      this.nextTurn = true;
      console.log(
        this.players[this.index] +
          ' ' +
          this.players[this.index].name +
          ' ' +
          this.players[this.index].score
      );
      console.log('all cards down index ' + this.index);
      console.log('all cards down turncount ' + this.turncount);
      console.log('all cards down length ' + this.players.length);
    }
    this.flippedCards = [];
  }
  //TODO remove console log
  Restart(): void {
    if (this.index >= this.players.length) {
      this.index -= 1;
      console.log('restart if ' + this.index);
      console.log('restart if ' + this.turncount);
      console.log('restart if ' + this.players.length);
    } else {
      this.index++;
      console.log('restart else index ' + this.index);
      console.log('restart else turncount ' + this.turncount);
      console.log('restart else length ' + this.players.length);
    }
    this.cardService.shuffle(this.cards);
    this.cards.forEach((card) => {
      card.isFlipped = false;
    });
    this.nextTurn = false;
  }
  //#endregion
}
