import { Component, computed, signal } from '@angular/core';
import {
  AMARIS_RERA,
  CLUB_AMENITIES,
  CLUB_SPACES,
  FEATURES,
  LOCATION_GROUPS,
  NAV_LINKS,
  RESIDENCES,
  STATS,
  UNIT_SIZES,
} from '../../data/amaris.data';
import { ADDRESS, EMAIL, PHONE, PHONE_LINK } from '../../data/company';
import { CountUpDirective } from '../../shared/count-up.directive';
import { EnquiryFormComponent } from '../../shared/enquiry-form.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { SiteHeaderComponent } from '../../shared/site-header.component';
import { VisitorTrackingService } from '../../visitor-tracking.service';

@Component({
  selector: 'app-amaris',
  imports: [SiteHeaderComponent, SiteFooterComponent, EnquiryFormComponent, RevealDirective, CountUpDirective],
  templateUrl: './amaris.component.html',
})
export class AmarisComponent {
  readonly navLinks = NAV_LINKS;
  readonly stats = STATS;
  readonly features = FEATURES;
  readonly clubSpaces = CLUB_SPACES;
  readonly clubAmenities = CLUB_AMENITIES;
  readonly residences = RESIDENCES;
  readonly unitSizes = UNIT_SIZES;
  readonly locationGroups = LOCATION_GROUPS;
  readonly phone = PHONE;
  readonly phoneLink = PHONE_LINK;
  readonly email = EMAIL;
  readonly rera = AMARIS_RERA;
  readonly address = ADDRESS;

  readonly activeLocation = signal(LOCATION_GROUPS[0].key);
  readonly activeLocationGroup = computed(
    () => this.locationGroups.find((g) => g.key === this.activeLocation()) ?? this.locationGroups[0],
  );
  readonly contactUnit = signal('');

  constructor(private VisitorTrackerService:VisitorTrackingService) {}

  ngOnInit(): void {
    this.VisitorTrackerService.logVisitor('https://kurrainfra.keyonprop.com/amaris').subscribe({
      next: (res) => console.log('Visitor logged', res),
      error: (err) => console.error('Error logging visitor:', err)
    });;
  }

  scrollTo(id: string, event?: Event): void {
    event?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  selectUnit(size: string): void {
    this.contactUnit.set(`${size} sq ft`);
    this.scrollTo('contact');
  }
}
