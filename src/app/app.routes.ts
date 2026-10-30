import { Type } from '@angular/core';
import { Route, Routes, UrlSegment } from '@angular/router';
import { NAV_LINKS } from './data/amaris.data';
import { NavLink } from './data/company';
import { KAIROS_NAV_LINKS } from './data/kairos.data';
import { AmarisComponent } from './pages/amaris/amaris.component';
import { HomeComponent } from './pages/home/home.component';
import { KairosComponent } from './pages/kairos/kairos.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

const CONTACT_LINK: NavLink = { id: 'contact', label: 'Contact' };

/**
 * Matches `base` and `base/<section>` (e.g. /amaris and /amaris/location) with a single route, so
 * the page component is reused while moving between sections. Section paths give Google Ads
 * sitelinks distinct final URLs; AppComponent scrolls to the `section` param after navigation.
 */
function sectionRoute(base: string, component: Type<unknown>, pageTitle: string, project: string, links: NavLink[]): Route {
  const sections = [...links, CONTACT_LINK];
  const prefix = base ? [base] : [];
  return {
    matcher: (segments: UrlSegment[]) => {
      if (!prefix.every((p, i) => segments[i]?.path === p)) return null;
      const rest = segments.slice(prefix.length);
      if (rest.length === 0) return { consumed: segments };
      if (rest.length === 1 && sections.some((s) => s.id === rest[0].path)) {
        return { consumed: segments, posParams: { section: rest[0] } };
      }
      return null;
    },
    component,
    title: (route) => {
      const section = sections.find((s) => s.id === route.params['section']);
      return section ? `${section.label} | ${project}` : pageTitle;
    },
  };
}

export const routes: Routes = [
  sectionRoute('', HomeComponent, 'Kurra Infra | Luxury Residences in the Financial District', 'Kurra Infra', []),
  sectionRoute('amaris', AmarisComponent, 'Amaris by Kurra Infra | Ultra-luxury 4 BHK Residences', 'Amaris by Kurra Infra', NAV_LINKS),
  sectionRoute('kairos', KairosComponent, 'Kairos by Kurra Infra | Luxury 4 BHK Residences, Coming Soon', 'Kairos by Kurra Infra', KAIROS_NAV_LINKS),
  { path: 'thankyou', component: ThankYouComponent, title: 'Thank You | Kurra Infra' },
  { path: '**', redirectTo: '' },
];
