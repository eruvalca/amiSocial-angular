import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Member } from '../../interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private memberUrl = "https://localhost:5001/member/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getMemberByUser(): Observable<Member> {
    return this.http.get<Member>(this.memberUrl, this.httpOptions)
      .pipe(
        catchError(error => this.handleError<Member>('getMemberByUser'))
      );
  }

  createMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.memberUrl, member, this.httpOptions)
      .pipe(
        catchError(error => this.handleError<Member>('createMember'))
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
