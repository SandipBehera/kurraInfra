import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHONE, PHONE_LINK, whatsappLink } from '../../data/company';
import { PROJECTS } from '../../data/projects';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { SiteHeaderComponent } from '../../shared/site-header.component';

interface ThankYouState {
  name?: string;
  project?: string;
}

/** Shown after an enquiry is submitted. The enquiry form passes the visitor's name and project as router state. */
@Component({
  selector: 'app-thank-you',
  imports: [RouterLink, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './thank-you.component.html',
})
export class ThankYouComponent {
  private readonly state: ThankYouState = (typeof history !== 'undefined' && history.state) || {};

  readonly name = this.state.name?.trim().split(/\s+/)[0] ?? '';
  readonly project = PROJECTS.find((p) => p.name.toLowerCase() === this.state.project?.toLowerCase());
  readonly phone = PHONE;
  readonly phoneLink = PHONE_LINK;
  readonly whatsappHref = whatsappLink(
    `Hi, I just submitted an enquiry${this.project ? ` for ${this.project.name}` : ''} on your website.`,
  );
}
