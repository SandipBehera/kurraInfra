import { Component, HostListener, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavLink } from '../data/company';

/** Floating glass navigation bar. Section links scroll within the current page. */
@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  template: `
    <header class="nav" [class.nav--scrolled]="scrolled() || solid()" [class.nav--open]="menuOpen()">
      <div class="nav__inner glass">
        <a class="brand" href="#top" (click)="scrollTo('top', $event)" aria-label="Back to top">
          <img class="brand__logo" src="images/kurra_infra_logo.svg" alt="Kurra Infra" width="126" height="73" />
          @if (brand()) {
            <span class="brand__name">{{ brand() }}</span>
          }
        </a>

        <nav class="nav__links" aria-label="Primary">
          @if (showProjectsLink()) {
            <a routerLink="/">All projects</a>
          }
          @for (link of links(); track link.id) {
            <a [href]="'#' + link.id" [class.active]="activeSection() === link.id" (click)="scrollTo(link.id, $event)">
              {{ link.label }}
            </a>
          }
        </nav>

        <a class="btn btn--accent nav__cta" href="#contact" (click)="scrollTo('contact', $event)">{{ ctaLabel() }}</a>

        <button
          class="nav__toggle"
          type="button"
          (click)="menuOpen.set(!menuOpen())"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <span></span><span></span>
        </button>
      </div>

      <nav id="mobile-menu" class="mobile-menu glass" aria-label="Mobile">
        @if (showProjectsLink()) {
          <a routerLink="/" style="--i: 0">All projects</a>
        }
        @for (link of links(); track link.id; let i = $index) {
          <a [href]="'#' + link.id" [style.--i]="i + 1" (click)="scrollTo(link.id, $event)">{{ link.label }}</a>
        }
        <a href="#contact" [style.--i]="links().length + 1" (click)="scrollTo('contact', $event)">Contact</a>
      </nav>
    </header>
  `,
})
export class SiteHeaderComponent {
  /** Project name shown beside the Kurra Infra logo; omit on company-level pages. */
  readonly brand = input('');
  readonly links = input<NavLink[]>([]);
  readonly ctaLabel = input('Book a visit');
  readonly showProjectsLink = input(true);
  /** Use the frosted background from the start, for pages whose hero is light. */
  readonly solid = input(false);

  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);
  readonly activeSection = signal('');

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);

    const marker = window.innerHeight * 0.35;
    let current = '';
    for (const link of this.links()) {
      const section = document.getElementById(link.id);
      if (section && section.getBoundingClientRect().top <= marker) current = link.id;
    }
    this.activeSection.set(current);
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    this.menuOpen.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
