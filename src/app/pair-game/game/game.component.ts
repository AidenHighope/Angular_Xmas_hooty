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
  //------------ variables/declaration --------------
  constructor(private cardService: CardService) {}

  userInput: string = '';

  flippedCards: Cards[] = [];

  get cards(): Cards[] {
    return this.cardService.cards;
  }

  get players(): Player[] {
    return this.cardService.players;
  }

  get index(): number {
    return this.cardService.currentPlayerIndex;
  }

  //------------ methodes/logique --------------

  setPlayerName(input: string): void {
    let i = 0;
    this.players[i].name = input;
    i;
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
    if (this.cardService.checkMatch(this.flippedCards)) {
      // Handle matched cards (e.g., update score)
      console.log('Match!');
    } else {
      // Flip back unmatched cards
      this.flippedCards.forEach((card) => this.cardService.flipCard(card));
      console.log('Not a match!');
    }

    this.flippedCards = [];
  }

  Restart(): void {
    this.cardService.shuffle(this.cards);
    this.cards.forEach((card) => {
      card.isFlipped = false;
    });
  }
}
