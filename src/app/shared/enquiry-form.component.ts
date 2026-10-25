import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { whatsappLink } from '../data/company';

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
  readonly project = input.required<string>();
  readonly unitSizes = input<string[]>([]);
  readonly submitLabel = input('Enquire now');
  readonly unit = model('');

  name = '';
  phone = '';
  email = '';

  send(): void {
    const lines = [
      `Hi, I am interested in ${this.project()} by Kurra Infra.`,
      `Name: ${this.name}`,
      `Phone: ${this.phone}`,
      this.email && `Email: ${this.email}`,
      this.unit() && `Preferred unit: ${this.unit()}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener');
  }
}
