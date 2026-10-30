import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, Router, RouterOutlet, Scroll } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kurrainfra';

  constructor() {
    const router = inject(Router);
    let previousPage: unknown = null;
    // All scrolling after navigation lives here (the router's own restoration is disabled).
    // Section URLs (e.g. /amaris/location) land on their section: instantly when arriving on the
    // page, smoothly when moving between sections of the page already open.
    router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll), takeUntilDestroyed())
      .subscribe((e) => {
        let route: ActivatedRouteSnapshot = router.routerState.snapshot.root;
        while (route.firstChild) route = route.firstChild;
        const samePage = route.component === previousPage;
        previousPage = route.component;

        const behavior: ScrollBehavior = samePage ? 'smooth' : 'instant';
        const section = route.params['section'];
        if (e.position) {
          window.scrollTo({ left: e.position[0], top: e.position[1], behavior: 'instant' });
        } else if (section) {
          document.getElementById(section)?.scrollIntoView({ behavior, block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior });
        }
      });
  }
}
