import {computed, inject, Injectable, resource, Signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Movie, MovieDetails} from '../model/movie.model';
import {toSignal} from '@angular/core/rxjs-interop';
import { fetchWithMocks } from '../mock.interceptor';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  protected httpClient = inject(HttpClient);

  getMovies(): Signal<Movie[]> {
    return toSignal(this.httpClient.get<Movie[]>('/movies'), {initialValue: []});
  }

  getMovieDetails(movieId: string): Signal<MovieDetails | undefined> {
    return toSignal(this.httpClient.get<MovieDetails>('/movies/'+ movieId))
  }

   users = resource<any, string>({
    loader: async () => {
      const response = await fetch(`https://jsonfakery.com/movies/paginated`);

      if (!response.ok) throw new Error("Unable to load users!");
      return (await response.json());
    },
  });

  movieResource = resource({
    loader: async () => {
      const response = await fetchWithMocks('/movies');
      return await response.json();
    },
});
  
  // getMovies(): Observable<Movie[]> {
  //   return this.httpClient.get<Movie[]>('/movies');
  // }

  // getMovieDetails(movieId: string): Observable<MovieDetails> {
  //   return this.httpClient.get<MovieDetails>('/movies/'+ movieId);
  // }

  filterMovieList(title = '', year = '', movies: Signal<Movie[]>) {
    console.log('filterMovieList', title, year, movies());
    // return computed(() => 
     return movies().filter((movie: Movie) =>
        (year.length < 4 || (year.length === 4 && movie.release_date.split('-')[0].includes(year))) &&
        movie.title.toLowerCase().includes(title.toLowerCase())
      )
    // );
     }

    //  filterMovieList(title = '', year = ''): Observable<Movie[]> {
    //   return this.getMovies().pipe(
    //     map(movies => movies.filter(movie =>
    //         (year.length < 4 || year.length === 4 && movie.release_date.split('-')[0].includes(year))
    //         && movie.title.toLowerCase().includes(title))
    //     )
    //   );
    // }

    addMovie(newMovie: Movie): void {
      // Here you would typically make an HTTP POST request to add the movie to the backend
      // For demonstration, we will just log it to the console
      console.log('Adding new movie:', newMovie);
      // Example:
      // this.httpClient.post('/movies', newMovie).subscribe();
    }
}
