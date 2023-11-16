import { Component, OnInit } from '@angular/core';
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
export class GameComponent implements OnInit {
  constructor(
    private cardService: CardService,
    public popupService: PopupService
  ) {}

  isVisible: boolean = true;
  //------------ methodes/global logique --------------

  ngOnInit() {
    this.popupService.popupState$.subscribe();
  }

  toggleIsVisible(): void {
    this.isVisible = !this.isVisible;
  }

  openPopup() {
    this.popupService.openPopup();
  }

  //#region GAME LOGIC
  //------------ variables/declaration game --------------
  defaultName: string = 'empty';

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

  sortedPlayers: Player[] = [];
  index: number = 0;

  //------------ methodes/game logique --------------
  addNewPlayer(input: string): void {
    let newPlayer = { name: input, score: 0 };
    this.players.push(newPlayer);
    this.updateName();
  }
  sortScore(): void {
    this.sortedPlayers = this.players.slice().sort((a, b) => b.score - a.score);
    this.openPopup();
  }

  updateName(): void {
    this.defaultName = this.players[this.index].name;
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
    }
    this.flippedCards = [];
  }
  Restart(): void {
    this.index++;
    this.updateName();
    this.cardService.shuffle(this.cards);
    this.cards.forEach((card) => {
      card.isFlipped = false;
    });
    this.nextTurn = false;
  }
}
