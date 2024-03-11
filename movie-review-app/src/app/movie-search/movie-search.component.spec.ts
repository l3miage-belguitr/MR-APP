import { Component } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent {
  searchQuery: string = '';
  movie: any;

  constructor(private movieService: MovieService) { }

  search() {
    this.movieService.searchMovie(this.searchQuery).subscribe(data => {
      this.movie = data;
    });
  }
}
