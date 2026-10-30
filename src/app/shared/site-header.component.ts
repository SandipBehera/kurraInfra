import { Component, HostListener, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavLink } from '../data/company';

/**
 * Floating glass navigation bar. With `basePath` set, section links navigate to section URLs
 * (e.g. /amaris/location) and AppComponent scrolls there; otherwise they scroll within the page.
 */
@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  template: `
    <header class="nav" [class.nav--scrolled]="scrolled() || solid()" [class.nav--open]="menuOpen()">
      <div class="nav__inner glass">
        <a class="brand" [href]="href('')" (click)="go('', $event)" aria-label="Back to top">
          <img class="brand__logo" src="images/kurra_logo.jpeg" alt="Kurra Infra" width="126" height="73" />
          @if (brand()) {
            <span class="brand__name">{{ brand() }}</span>
          }
        </a>

        <nav class="nav__links" aria-label="Primary">
          @if (showProjectsLink()) {
            <a routerLink="/">All projects</a>
          }
          @for (link of links(); track link.id) {
            <a [href]="href(link.id)" [class.active]="activeSection() === link.id" (click)="go(link.id, $event)">
              {{ link.label }}
            </a>
          }
        </nav>

        <a class="btn btn--accent nav__cta" [href]="href('contact')" (click)="go('contact', $event)">{{ ctaLabel() }}</a>

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
          <a [href]="href(link.id)" [style.--i]="i + 1" (click)="go(link.id, $event)">{{ link.label }}</a>
        }
        <a [href]="href('contact')" [style.--i]="links().length + 1" (click)="go('contact', $event)">Contact</a>
      </nav>
    </header>
  `,
})
export class SiteHeaderComponent {
  private readonly router = inject(Router);

  /** Project name shown beside the Kurra Infra logo; omit on company-level pages. */
  readonly brand = input('');
  readonly links = input<NavLink[]>([]);
  /** Page path whose section routes the links use, e.g. '/amaris'; null keeps links in-page. */
  readonly basePath = input<string | null>(null);
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

  /** Link target for a section; '' is the top of the page. */
  href(id: string): string {
    const base = this.basePath();
    if (base === null) return '#' + (id || 'top');
    return '/' + [base.replace(/^\/|\/$/g, ''), id].filter(Boolean).join('/');
  }

  go(id: string, event: MouseEvent): void {
    // Let modified clicks (new tab, etc.) follow the href.
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    this.menuOpen.set(false);
    if (this.basePath() === null) {
      document.getElementById(id || 'top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      this.router.navigateByUrl(this.href(id));
    }
  }
}
