import { Routes } from '@angular/router';
import { AmarisComponent } from './pages/amaris/amaris.component';
import { HomeComponent } from './pages/home/home.component';
import { KairosComponent } from './pages/kairos/kairos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Kurra Infra | Luxury Residences in the Financial District' },
  { path: 'amaris', component: AmarisComponent, title: 'Amaris by Kurra Infra | Ultra-luxury 4 BHK Residences' },
  { path: 'kairos', component: KairosComponent, title: 'Kairos by Kurra Infra | Luxury 4 BHK Residences, Coming Soon' },
  { path: '**', redirectTo: '' },
];
