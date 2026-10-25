import { Component, signal } from '@angular/core';
import { ADDRESS, EMAIL, PHONE, PHONE_LINK } from '../../data/company';
import {
  KAIROS_NAV_LINKS,
  KAIROS_RESIDENCES,
  KAIROS_STATS,
  KAIROS_UNIT_SIZES,
} from '../../data/kairos.data';
import { CountUpDirective } from '../../shared/count-up.directive';
import { EnquiryFormComponent } from '../../shared/enquiry-form.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { SiteHeaderComponent } from '../../shared/site-header.component';

@Component({
  selector: 'app-kairos',
  imports: [SiteHeaderComponent, SiteFooterComponent, EnquiryFormComponent, RevealDirective, CountUpDirective],
  templateUrl: './kairos.component.html',
  host: { class: 'theme-kairos' },
})
export class KairosComponent {
  readonly navLinks = KAIROS_NAV_LINKS;
  readonly stats = KAIROS_STATS;
  readonly residences = KAIROS_RESIDENCES;
  readonly unitSizes = KAIROS_UNIT_SIZES;
  readonly phone = PHONE;
  readonly phoneLink = PHONE_LINK;
  readonly email = EMAIL;
  readonly address = ADDRESS;

  readonly contactUnit = signal('');

  scrollTo(id: string, event?: Event): void {
    event?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  selectUnit(size: string): void {
    this.contactUnit.set(`${size} sq ft`);
    this.scrollTo('contact');
  }
}
