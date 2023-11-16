import { Injectable } from '@angular/core';
import { Cards } from 'src/app/models/Card';
import { Player } from 'src/app/models/Player';
@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards: Cards[] = [];
  players: Player[] = [];
  constructor() {
    this.initializeCards();
  }
  private initializeCards(): void {
    const url = '../../../assets/card-game/';
    const cardIdentities = [
      `${url}A.jpg`,
      `${url}B.jpg`,
      `${url}C.jpg`,
      `${url}D.jpg`,
      `${url}E.jpg`,
      `${url}F.jpg`,
      `${url}G.jpg`,
      `${url}H.jpg`,
      `${url}I.jpg`,
      `${url}J.jpg`,
    ];
    const shuffledIdentities = this.shuffle([
      ...cardIdentities,
      ...cardIdentities,
    ]);

    this.cards = shuffledIdentities.map((identity, index) => ({
      id: index,
      identity,
      isFlipped: false,
    }));
  }

  shuffle(array: any[]): any[] {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  flipCard(card: Cards): void {
    card.isFlipped = !card.isFlipped;
  }

  checkMatch(cards: Cards[]): boolean {
    return cards.every((card) => card.identity === cards[0].identity);
  }
}
