import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'http://localhost:5000'; // Update this with your Flask backend URL

  constructor(private http: HttpClient) { }

  searchMovie(title: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/${title}`);
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}`);
  }

  submitReview(movieId: string, name: string, review: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/review`, { movieId, name, review });
  }
}
