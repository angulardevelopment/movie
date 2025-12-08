import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { StoreModule } from '@mini-rx/signal-store'; 
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { mockingInterceptor } from './mock.interceptor';
// import { provideStore } from '@ngrx/store';
// import { provideStore, provideFeature, provideEffects } from '@mini-rx/signal-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([mockingInterceptor])),
    provideRouter(routes),
    // provideStore(),
    // importProvidersFrom(StoreModule.forRoot({ reducers: {  }, extensions: [] })),
    //     provideStore({ reducers, extensions }),
    // provideFeature('todo', todoReducer),
    // provideEffects([TodoEffects])
]
};
