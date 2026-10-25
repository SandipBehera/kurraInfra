import { Component, inject, input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { whatsappLink } from '../data/company';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';

/**
 * Enquiry form. There is no backend yet, so a submitted enquiry opens WhatsApp
 * with the details prefilled for the sales team.
 */
@Component({
  selector: 'app-enquiry-form',
  imports: [FormsModule],
  host: { class: 'enquiry glass' },
  template: `
    <form #form="ngForm" (ngSubmit)="form.valid && send()">
      <ng-content />
      <label class="field">
        <span>Name</span>
        <input name="name" [(ngModel)]="name" required autocomplete="name" />
      </label>
      <label class="field">
        <span>Phone</span>
        <input name="phone" type="tel" [(ngModel)]="phone" required autocomplete="tel" />
      </label>
      <label class="field">
        <span>Email</span>
        <input name="email" type="email" [(ngModel)]="email" email autocomplete="email" />
      </label>
      <label class="field">
        <span>Preferred unit size</span>
        <select name="unit" [(ngModel)]="unit">
          <option value="">Select a size</option>
          @for (size of unitSizes(); track size) {
            <option [value]="size">{{ size }}</option>
          }
        </select>
      </label>
      <button class="btn btn--accent btn--block" type="submit" [disabled]="form.invalid">{{ submitLabel() }}</button>
    </form>
  `,
})
export class EnquiryFormComponent {
  private leads = inject(HttpServiceService);
  private router = inject(Router);
  readonly project = input.required<string>();
  readonly unitSizes = input<string[]>([]);
  readonly submitLabel = input('Enquire now');
  readonly unit = model('');
   errors = signal<Record<string, string>>({});
  name = '';
  phone = '';
  email = '';

  send(): void {
    const lead = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      projectName: this.project()
    };

    this.leads.formSubmit(lead).subscribe({
      next: () => {
        this.router.navigate(['/thankyou'], { state: { name: lead.name, project: lead.projectName } });
      },
      error: (err: unknown) => {
        console.error('Form submission failed:', err);
        this.errors.set({ form: 'Something went wrong. Please try again or call us.' });
      },
    });
  }
}
