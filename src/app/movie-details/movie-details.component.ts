import {Component, inject, input, InputSignal} from '@angular/core';
import { MovieDetails } from '../model/movie.model';
import { NgOptimizedImage } from '@angular/common';
import { MillionDollarPipe } from '../pipes/million-dollar.pipe';
import { MinToDurationPipe } from '../pipes/min-to-duration.pipe';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from '../services/movies.service';

@Component({
  selector: 'app-movie-details',
  template: `
    <!-- @let movie = movie$ | async; -->
    <h1>{{ movie()?.title }}</h1>
    <div class="details">
      @if (movie()?.poster) {
        <img [ngSrc]="movie()?.poster || ''" width="200" height="100" alt="Poster">
      }
      <div>
        <p>
          <span>Summary: </span>
          <span>{{ movie()?.summary }}</span>
        </p>
      </div>
    </div>
    <table class="horizontal">
      <caption>Details</caption>
      <thead>
      <tr>
        <th>Box office</th>
        <th>Budget</th>
        <th>Duration</th>
        <th>Producers</th>
        <th>Cinematographers</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td data-label="Box office">{{ movie()?.box_office | millionDollar }}</td>
        <td data-label="Budget">{{ movie()?.budget | millionDollar }}</td>
        <td data-label="Duration">{{ movie()?.duration | minToDuration }}</td>
        <td data-label="Producers">{{ movie()?.producers?.join(', ') }}</td>
        <td data-label="Cinematographers">{{ movie()?.cinematographers?.join(', ') }}</td>
      </tr>
      </tbody>
    </table>
  `,
  standalone: true,
  styleUrls: [ 'movie-details.component.scss' ],
  imports: [ NgOptimizedImage, MillionDollarPipe, MinToDurationPipe ]
})
export class MovieDetailsComponent {

  private movieId = inject(ActivatedRoute).snapshot.paramMap.get("id") ?? "";
  protected movie = inject(MoviesService).getMovieDetails(this.movieId);

}

