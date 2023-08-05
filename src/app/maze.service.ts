import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class MazeService {
   
   private apiServerUrl = 'https://psychic-iridium-394316.uc.r.appspot.com';

   constructor(private http: HttpClient) { }

   public defaultGetMazeFinal(type: String): Observable<number[][]> {
      return this.http.get<number[][]>(`${this.apiServerUrl}/mazeinfo/defaultFinal/${type}`);
   }

   public getMazeFinal(type: String, size: number): Observable<number[][]> {
      return this.http.get<number[][]>(`${this.apiServerUrl}/mazeinfo/final/${type}/${size}`);
   }

   public defaultGetMazeFull(type: String): Observable<number[][][]> {
      return this.http.get<number[][][]>(`${this.apiServerUrl}/mazeinfo/defaultFull/${type}`);
   }

   public checkSolution(maze: number[][]): Observable<boolean> {
      //console.log(maze);
      return this.http.post<boolean>(`${this.apiServerUrl}/mazeinfo/check`, maze);
   }

   public saveMaveInfo(maze: number[][]): void {
      this.http.post(`${this.apiServerUrl}/accounts/saveMaze`, maze);
   }
}