import { Component, inject, model, signal, Signal, WritableSignal } from '@angular/core';
import { HighlightDirective } from '../highlight.directive';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { Movie } from '../model/movie.model';
import { MoviesService } from '../services/movies.service';
import { FavoritesService } from '../services/favorites.service';
import { HttpClient } from '@angular/common/http';

import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HighlightDirective,
    MovieItemComponent,
    FormsModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private moviesService: MoviesService) {
    this.fetchData();
  }
  data = signal<Movie[]>([]);
  loading = signal(true);
  protected http = inject(HttpClient);
  parentCounter = 0;
  // editingMovie = signal<Movie | null>(null);
  //  movieFormData = model({
  //   id: 0,
  //   title: '',
  //   releaseDate: new Date().getFullYear(),
  //   genre: '',
  //   description: ''
  // });
    editingMovie: Movie | null = null;
  movieFormData = {
    id: 0,
    title: '',
    release_date: new Date().getFullYear().toString(),
    genre: '',
    description: ''
  };

  dummy = toObservable(this.data);
  protected movies: Signal<Movie[]> = inject(MoviesService).getMovies();
  protected favoritesService = inject(FavoritesService);
  filteredMovies = signal<Movie[]>([]);

  filter(title: string, year: string) {
    const filtered = (this.moviesService.filterMovieList(title, year, this.movies));
    // this.movies.set(filtered);
    console.log('filter', filtered);
  }

  ngOnInit() {
    // console.log(this.moviesService.users.value(), this.moviesService.movieResource.value(), this,'ngOnInit');
  }

  fetchData() {
    this.loading.set(true);
    this.http.get<Movie[]>('/movies').subscribe({
      next: res => {
        this.data.set(res);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  //   editMovie(movie: Movie): void {
  //   this.editingMovie.set(movie);
  //   // this.movieFormData.update((val) => movie);
  // }

  editMovie(movie: Movie): void {
    this.editingMovie = movie;
    this.movieFormData = { ...movie };
  }

  saveMovie(): void {
    if (this.editingMovie) {
      // Update existing movie
      this.updateMovie();
    } else {
      // Add new movie
      this.addMovie();
    }
        console.log('saveMovie', this);
  }

  addMovie(): void {
    const newMovie: Movie = {
      id: this.generateNewId(),
      title: this.movieFormData.title,
      release_date: this.movieFormData.release_date,
      genre: this.movieFormData.genre,
      description: this.movieFormData.description
    };
    
    this.moviesService.addMovie(newMovie).subscribe({
  next: (response) => {console.log('Success!', response)

      this.data.update(movies => 
          movies.map(m => m.id === response.id ? response : m)
        );
  },
  error: (err) => console.error('Error occurred:', err)
});

    this.resetForm();
  }

  updateMovie(): void {
    if (this.editingMovie) {
      const updatedMovie: Movie = {
        ...this.editingMovie,
        title: this.movieFormData.title,
        release_date: this.movieFormData.release_date,
        genre: this.movieFormData.genre,
        description: this.movieFormData.description
      };
      
      // Update your data source (adjust based on your data management)
      // this.moviesService.updateMovie(updatedMovie);
      
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingMovie = null;
    this.resetForm();
  }

  resetForm(): void {
    this.movieFormData = {
      id: 0,
      title: '',
      release_date: new Date().getFullYear().toString(),
      genre: '',
      description: ''
    };
  }

  private generateNewId(): number {
    // Simple ID generation - adjust based on your needs
    return Math.max(...this.data().map(m => m.id)) + 1;
  }
}
