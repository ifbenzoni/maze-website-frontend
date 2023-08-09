import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiServerUrl = 'https://psychic-iridium-394316.uc.r.appspot.com';

  constructor(private http: HttpClient) { }

  public login(userJSON: string): Observable<string> {
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post<string>(`${this.apiServerUrl}/accounts/login`, userJSON, {headers: headers});
  }

  public getJwtUserDetails(jwt: string | null): Observable<string[] | null> {
    return this.http.post<string[] | null>(`${this.apiServerUrl}/accounts/jwtUserDetails`, jwt);
  }

  public addUser(jwt: string | null, userJSON: string): void {
    this.http.post(`${this.apiServerUrl}/accounts/create`, {jwt, userJSON});
  }

  public getUsers(jwt: string | null): Observable<string[]> {
    return this.http.post<string[]>(`${this.apiServerUrl}/accounts/getAll`, jwt);
  }

}