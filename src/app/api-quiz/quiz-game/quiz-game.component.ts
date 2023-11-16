import { Component, OnInit } from '@angular/core';
import { RootObject, Quiz } from 'src/app/models/Api';
import { QuizApiService } from 'src/app/shared/services/quiz-api.service';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss'],
})
export class QuizGameComponent implements OnInit {
  private readonly _apiService: QuizApiService;
  constructor(api: QuizApiService) {
    this._apiService = api;
  }
  questionList!: RootObject;
  categoryChoice: string = '';
  difficultyPicker: string = '';
  urls: string[] = [
    'https://quizzapi.jomoreschi.fr/api/v1/quiz',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz?category=musique',
    'https://quizzapi.jomoreschi.fr/api/v1/quiz?difficulty=' +
      this.difficultyPicker,
  ];
  // url: string = 'https://quizzapi.jomoreschi.fr/api/v1/quiz';
  ngOnInit(): void {
    this.getQuizList();
  }
  getQuizList(): void {
    this._apiService.GetAll(this.urls[0]).subscribe({
      next: (data) => {
        this.questionList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  updateQuizList(index: number): void {
    this._apiService.GetAll(this.urls[index]).subscribe({
      next: (data) => {
        this.questionList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

//TODO faire une sélection de question
/*
tv-cinema : 4q
id : 65328678e4123c9a1476bb0e 
^^^ avatar
id : 642438e068d7ea9aa952784a
^^^ ours d'or
id : 653280cfe4123c9a1476bab0
^^^special maman
id : 6532873de4123c9a1476bb18
^^^asterix

art_litterature 4q
id : 642438e068d7ea9aa952783c
^^^ michel ange
id : 642438e068d7ea9aa9527878
^^^ douanier
id : 653233e8e4123c9a1476ba5f
^^^ odyssée
id : 653287dfe4123c9a1476bb20
^^^albert camus

jv 4q
id : 642438e068d7ea9aa9527855
^^^mgs
id : 642438e068d7ea9aa952785a
^^^ phoenix wright
id : 642438e068d7ea9aa952785c
^^^ assassin creed
id : 642438e068d7ea9aa9527862
^^^ sonic

*/
