import { Component, input } from '@angular/core';
import { FloatingActionsComponent } from './floating-actions.component';

/** Page footer plus the floating contact buttons. */
@Component({
  selector: 'app-site-footer',
  imports: [FloatingActionsComponent],
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="brand">
          <img class="brand__logo" src="images/kurra_logo.jpeg" alt="Kurra Infra" width="126" height="73" loading="lazy" />
          @if (brand()) {
            <span class="brand__name">{{ brand() }}</span>
          }
        </div>
        <p class="footer__legal">
          @if (rera()) {
            TS RERA No. {{ rera() }}.
          }
          *Prices are indicative. All visuals are artistic impressions for illustration only, and nothing on this site
          is a legal offer.
        </p>
        <p class="footer__copy">© Keyon Properties  {{ year }}</p>
      </div>
    </footer>

    <app-floating-actions [project]="project()" [showEnquiry]="showEnquiry()" />
  `,
})
export class SiteFooterComponent {
  /** Project name shown beside the Kurra Infra logo; omit on company-level pages. */
  readonly brand = input('');
  readonly rera = input('');
  /** Project name to mention in the prefilled WhatsApp message. */
  readonly project = input('');
  readonly showEnquiry = input(true);

  readonly year = new Date().getFullYear();
}
