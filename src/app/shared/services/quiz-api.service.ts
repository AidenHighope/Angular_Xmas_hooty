import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OneQuestionRoot, Quiz, RootObject } from 'src/app/models/Api';

@Injectable({
  providedIn: 'root',
})
export class QuizApiService {
  private _http!: HttpClient;
  constructor(http: HttpClient) {
    this._http = http;
  }

  GetAll(url: string): Observable<RootObject> {
    return this._http.get<RootObject>(url);
  }

  GetQuizzes(url: string): Observable<Quiz[]> {
    return this._http.get<Quiz[]>(url);
  }
  GetOneQuiz(url: string): Observable<OneQuestionRoot> {
    return this._http.get<OneQuestionRoot>(url);
  }
}
