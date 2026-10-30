import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';

function pageComponent(route: ActivatedRouteSnapshot): unknown {
  while (route.firstChild) route = route.firstChild;
  return route.component;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      // Moving between sections of the same page scrolls instead of cross-fading.
      withViewTransitions({
        onViewTransitionCreated: ({ transition, from, to }) => {
          if (pageComponent(from) === pageComponent(to)) transition.skipTransition();
        },
      }),
      // Scrolling is handled in AppComponent so section URLs land on their section.
      withInMemoryScrolling({ scrollPositionRestoration: 'disabled' }),
      // Clicking the current section's link again still scrolls back to it.
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
  ],
};
