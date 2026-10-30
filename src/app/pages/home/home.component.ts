import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ADDRESS, EMAIL, PHONE, PHONE_LINK } from '../../data/company';
import { PROJECTS } from '../../data/projects';
import { RevealDirective } from '../../shared/reveal.directive';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { SiteHeaderComponent } from '../../shared/site-header.component';
import { VisitorTrackingService } from '../../visitor-tracking.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SiteHeaderComponent, SiteFooterComponent, RevealDirective],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly projects = PROJECTS;
  readonly phone = PHONE;
  readonly phoneLink = PHONE_LINK;
  readonly email = EMAIL;
  readonly address = ADDRESS;
  constructor(private VisitorTrackerService:VisitorTrackingService) {}
  
    ngOnInit(): void {
      this.VisitorTrackerService.logVisitor('https://kurrainfra.keyonprop.com/').subscribe({
        next: (res) => console.log('Visitor logged', res),
        error: (err) => console.error('Error logging visitor:', err)
      });;
    }
}
