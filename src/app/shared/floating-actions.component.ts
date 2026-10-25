import { Component, computed, input } from '@angular/core';
import { PHONE, PHONE_LINK, whatsappLink } from '../data/company';

/** Floating Call / Enquire / WhatsApp buttons: a stack on desktop, a bottom bar on phones. */
@Component({
  selector: 'app-floating-actions',
  template: `
    <nav class="fab" aria-label="Quick contact">
      <a class="fab__btn fab__btn--call" [href]="'tel:' + phoneLink" [attr.aria-label]="'Call ' + phone" style="--i: 0">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"
          />
        </svg>
        <span class="fab__label">Call us</span>
      </a>

      @if (showEnquiry()) {
        <a class="fab__btn fab__btn--enquire" href="#contact" (click)="enquire($event)" style="--i: 1">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 4h16v12H8l-4 4z" />
            <path d="M8 9h8M8 12h5" />
          </svg>
          <span class="fab__label">Enquire</span>
        </a>
      }

      <a
        class="fab__btn fab__btn--whatsapp"
        [href]="whatsappHref()"
        target="_blank"
        rel="noopener"
        aria-label="Chat with us on WhatsApp"
        style="--i: 2"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            class="fill"
            d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.1 1.3 15.2.1 12 .1 5.5.1.2 5.4.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.7c1.7.9 3.7 1.4 5.6 1.4 6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.4-8.3z"
          />
        </svg>
        <span class="fab__label">WhatsApp</span>
      </a>
    </nav>
  `,
})
export class FloatingActionsComponent {
  /** Project name to mention in the prefilled WhatsApp message. */
  readonly project = input('');
  readonly showEnquiry = input(true);

  readonly phone = PHONE;
  readonly phoneLink = PHONE_LINK;
  readonly whatsappHref = computed(() =>
    whatsappLink(
      this.project()
        ? `Hi, I am interested in ${this.project()} by Kurra Infra.`
        : 'Hi, I would like to know more about Kurra Infra projects.',
    ),
  );

  /** Scroll to the page's contact section and put the cursor in its form, if it has one. */
  enquire(event: Event): void {
    event.preventDefault();
    const section = document.getElementById('contact');
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const field = section.querySelector<HTMLInputElement>('app-enquiry-form input');
    field?.focus({ preventScroll: true });
  }
}
