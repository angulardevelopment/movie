import { Component, computed, DestroyRef, effect, inject, input, model, output, signal } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MillionDollarPipe } from '../pipes/million-dollar.pipe';
import { MinToDurationPipe } from '../pipes/min-to-duration.pipe';
import { RouterLink } from '@angular/router';
import { LikeStore } from '../like.store';
import { FeatureStore } from '@mini-rx/signal-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { 
//   form, 
//   required, 
//   minLength, 
//   validate, 
//   submit,
//   Control,
// } from '@angular/forms/signals'; upcoming v21
@Component({
  selector: 'app-movie-item',
  template: `
    <div class="movie-item">
      <div>
        <h4>
          <span class="icon-star" [class.active]="isFavorite()" (click)="toggleFavorite.emit(movie())"></span>
          {{ movie().title }}
        </h4>
        <small class="subtitle">
          <span>Release date: {{ movie().release_date }}</span>
          <span>Budget:  {{ movie().budget | millionDollar }} </span>
          <span>Duration: {{ movie().duration | minToDuration }}</span>
                <span>Likes: {{ store.count() }} {{count()}}</span>
                    <p>Popularity: {{ isPopular() }}</p>

        </small>
      </div>

      <button [routerLink]="'details/'+ movie().id">Details</button>

    <!-- <button (click)="store.increment()">Increment</button>
    <button (click)="store.decrement()">Decrement</button>
    <button (click)="store.reset()">Reset</button>

    <button (click)="increment()"> Increment e </button>

        <div>Counter: {{ count() }}</div>
      <button (click)="incrementModel()">j</button> -->

      <!-- unsupported -->
      <!-- <input type="text" [(ngModel)]="mySignal()" (change)="h()" /> -->

      <!-- <input type="text" placeholder="text" [value]="mySignal()" (input)="mySignal.set($any($event.target).value)" />
      <input type="number" placeholder="number" [value]="value()"  /> -->
    </div>
  `,
  standalone: true,
  imports: [
    MillionDollarPipe,
    MinToDurationPipe,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
],
  styleUrls: ['movie-item.component.scss']
})
export class MovieItemComponent {
  value = input(0);
  label = computed(() => `The slider's value is ${this.value()}`);
  mySignal = signal('');
  countModel = model(0);
  movie = input.required<Movie>();
  isFavorite = input<boolean>(false);
  toggleFavorite = output<Movie>();
  readonly store = inject(LikeStore);
  state = signal({ count: 0 });
  isPopular = computed(() => this.store.count() > 5 ? 'Popular' : 'Not Popular');

  count = computed(() => this.state().count);

  private destroyRef = inject(DestroyRef); // To ensure effect is cleaned up on destroy

  constructor() {
    // super('counter', { count: 0 });

    //   this.loadDetail = this.store.rxEffect<string>(switchMap(id => 
    // this.service.getById(id).pipe(
    //   tapResponse({
    //     next: detail => this.store.setState({ detail }),
    //     error: () => {/* handle error */}
    //   })
    // )
    // ));



    effect(() => {
      console.log(`User ID changed, fetching data for: ${this.count()}`, this.mySignal(), this.value());
      // You could place a data fetching call here
      // Imagine sending analytics data here
    }, {}); // injector: this.destroyRef.destroyed Auto-cleanup with DestroyRef (20.1 version)

  }

  ngOnInit() {
    console.log('MovieItemComponent initialized with movie:', this.movie());
  }
  increment() {
    this.setState(s => ({ count: s.count + 1 }));
  }

  setState(update: (state: { count: number }) => { count: number }) {
    this.state.set(update(this.state()));
  }

  incrementModel() {
    this.countModel.update((val) => val + 1);
  }


}

