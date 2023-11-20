import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from 'src/app/models/Player';

@Injectable({
  providedIn: 'root',
})
export class GameRulesService {
  private _gameRuleState = new BehaviorSubject<boolean>(true);
  gameRuleState$ = this._gameRuleState.asObservable();
  openRules() {
    this._gameRuleState.next(true);
  }
  closeRules() {
    this._gameRuleState.next(false);
  }

  addPlayer(input: string, player: Player[]): void {
    let newPlayer = { name: input.trim(), score: 0 };
    player.push(newPlayer);
  }
  constructor() {}
}
