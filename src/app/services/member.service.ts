import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Member } from '../interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private memberUrl = "https://localhost:5001/member/";

  constructor(
    private http: HttpClient
  ) { }

  getMemberByUser(): Observable<Member> {
    return this.http.get<Member>(this.memberUrl)
      .pipe(
        catchError(error => this.handleError<Member>('getMemberByUser'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
