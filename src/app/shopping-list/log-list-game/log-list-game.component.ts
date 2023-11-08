import { Component } from '@angular/core';

@Component({
  selector: 'app-log-list-game',
  templateUrl: './log-list-game.component.html',
  styleUrls: ['./log-list-game.component.scss'],
})
export class LogListGameComponent {
  //variables
  userInput: string = '';
  ingredientList: { nb: number; name: string }[] = [];
  IsInBasket: boolean = false;

  //fonctions
  addNew(nameInput: string): void {
    nameInput = this.userInput;
    let newIngredient = { nb: 1, name: nameInput };
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
  }
  addOne(id: number): void {
    this.ingredientList[id].nb++;
  }
  removeOne(id: number): void {
    this.ingredientList[id].nb--;
    if (this.ingredientList[id].nb === 0) {
      this.ingredientList.splice(id, 1);
    }
  }

  crossOff(): void {
    if (this.ingredientList.length === 3) {
      console.log('my first word was hoot');
    }
  }
}
