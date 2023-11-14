import { Component, OnInit } from '@angular/core';
import { Cards } from 'src/app/models/Card';
import { CardService } from 'src/app/shared/services/card.service';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  //#region GLOBAL
  //------------ variables/declaration global --------------
  isVisible: boolean = true;
  //------------ methodes/global logique --------------

  toggleIsVisible(): void {
    this.isVisible = !this.isVisible;
  }
  //#endregion

  //#region GAME LOGIC
  //------------ variables/declaration game --------------
  constructor(private cardService: CardService) {}

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

  index: number = 0;

  //------------ methodes/game logique --------------
  addNewPlayer(input: string): void {
    let newPlayer = { name: input, score: 0 };
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
    }
    this.flippedCards = [];
  }

  Restart(): void {
    this.cardService.shuffle(this.cards);
    this.cards.forEach((card) => {
      card.isFlipped = false;
    });
    this.index++;
    this.nextTurn = false;
  }
  //#endregion
}
