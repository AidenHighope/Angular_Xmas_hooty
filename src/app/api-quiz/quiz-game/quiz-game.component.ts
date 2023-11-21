import { Component, OnInit } from '@angular/core';
import { OneQuestionRoot } from 'src/app/models/Api';
import { Player } from 'src/app/models/Player';
import { GameRulesService } from 'src/app/shared/services/game-rules.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { QuizApiService } from 'src/app/shared/services/quiz-api.service';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss'],
})
export class QuizGameComponent implements OnInit {
  //TODO remove console logs

  private readonly _apiService: QuizApiService;
  GameRules: GameRulesService;
  constructor(
    api: QuizApiService,
    parentGR: GameRulesService,
    public popupService: PopupService
  ) {
    this.GameRules = parentGR;
    this._apiService = api;
  }

  ngOnInit(): void {
    this.openRules();
    this.getOne(this.startIndex);
    this.popupService.popupState$.subscribe();
  }
  userInput: string = '';
  startIndex: number = 0;
  currentQuestion!: OneQuestionRoot;
  teams: Player[] = [];
  sortedTeams: Player[] = [];
  urls: string[] = [
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/65329fcae4123c9a1476bbb2',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/65328678e4123c9a1476bb0e',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa952784a',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/653280cfe4123c9a1476bab0',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/6532873de4123c9a1476bb18',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa952783c',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa9527878',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/653233e8e4123c9a1476ba5f',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/653287dfe4123c9a1476bb20',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa9527855',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa952785a',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa952785c',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa9527862',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa9527863',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa9527864',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa9527867',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa952786a',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa952786b',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa952786e',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa9527875',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa952787c',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz/642438e068d7ea9aa9527888',
  ];
  switchTurn: boolean = true;
  shuffledAnswers: string[] = [];
  nextQ: boolean = false;
  clickCounter: number = 0;
  displayGame: boolean = false;
  isCorrect: boolean = false;

  toggleGame(): void {
    this.displayGame = true;
  }

  sortTeamsScore(): void {
    this.sortedTeams = this.teams.slice().sort((a, b) => b.score - a.score);
    this.openPopup();
  }

  toggleSwitchTurn(): void {
    this.switchTurn = !this.switchTurn;
  }

  updatePlayer(): Player {
    let i: number;
    if (this.switchTurn) {
      i = 0;
    } else if (!this.switchTurn) {
      i = 1;
    } else {
      throw console.error('marche pas');
    }
    return this.teams[i];
  }

  checkScore(selectedAnswer: string): void {
    this.clickCounter++;
    if (selectedAnswer === this.currentQuestion.quiz.answer) {
      this.updatePlayer().score += 15;
    } else if (this.currentQuestion.quiz.badAnswers.includes(selectedAnswer)) {
      this.updatePlayer().score -= 5;
      if (this.updatePlayer().score < 0) {
        this.updatePlayer().score = 0;
      }
    }

    this.toggleSwitchTurn();
    if (this.clickCounter === 2) {
      this.toggleButton();
      this.clickCounter = 0;
      this.isCorrect = true;
    }
  }

  addTeam(input: string): void {
    this.GameRules.addPlayer(input, this.teams);
    this.userInput = '';
  }

  openRules(): void {
    this.GameRules.openRules();
  }
  closeRules(): void {
    this.GameRules.closeRules();
    this.toggleGame();
  }

  getOne(index: number): void {
    this._apiService.GetOneQuiz(this.urls[index]).subscribe((data) => {
      this.currentQuestion = data;
      this.updatePlayer();
      this.shuffleAnswers();
    });
  }

  shuffleAnswers(): void {
    let allAnswers: string[] = [
      this.currentQuestion.quiz.answer,
      ...this.currentQuestion.quiz.badAnswers,
    ];
    for (let i = allAnswers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    this.shuffledAnswers = allAnswers;
  }

  nextQuestion(): void {
    this.startIndex++;
    this.getOne(this.startIndex);
    this.toggleButton();
    this.isCorrect = false;
  }

  toggleButton(): void {
    this.nextQ = !this.nextQ;
  }

  openPopup() {
    this.popupService.openPopup();
  }
}
