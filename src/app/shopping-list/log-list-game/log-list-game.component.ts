import { Component } from '@angular/core';

@Component({
  selector: 'app-log-list-game',
  templateUrl: './log-list-game.component.html',
  styleUrls: ['./log-list-game.component.scss'],
})
export class LogListGameComponent {
  //variables
  userInput: string = '';
  ingredientList: { nb: number; name: string; isInBasket: boolean }[] = [];
  IsValid: boolean = false;
  secretMessage: string = '';
  //fonctions
  addNew(nameInput: string): void {
    nameInput = this.userInput;
    let newIngredient = { nb: 1, name: nameInput, isInBasket: false };
    const exist = this.ingredientList.find(
      (ingredient) =>
        ingredient.name.trim().toLowerCase() === nameInput.toLowerCase()
    );
    if (exist) {
      exist.nb++;
      this.userInput = '';
    }
    if (nameInput.trim() != '' && !exist) {
      this.ingredientList.push(newIngredient);
      this.userInput = '';
    }
    this.toggleValidity();
  }
  addOne(id: number): void {
    this.ingredientList[id].nb++;
  }
  removeOne(id: number): void {
    this.ingredientList[id].nb--;
    if (this.ingredientList[id].nb === 0) {
      this.ingredientList.splice(id, 1);
    }
    this.toggleValidity();
  }

  toggleBasket(id: number): void {
    this.ingredientList[id].isInBasket = !this.ingredientList[id].isInBasket;
    this.toggleValidity();
  }

  toggleValidity(): void {
    if (
      this.ingredientList.length >= 4 &&
      this.ingredientList.every((i) => i.isInBasket === true)
    ) {
      this.IsValid = true;
    } else {
      this.IsValid = false;
    }
  }

  addMessage(message: string) {
    this.secretMessage = message;
  }
}
