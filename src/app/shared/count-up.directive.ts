import { Directive, ElementRef, OnDestroy, OnInit, input } from '@angular/core';

/** Animates a number from 0 to its target the first time it scrolls into view. */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements OnInit, OnDestroy {
  readonly appCountUp = input.required<number>();
  readonly decimals = input(0);

  private observer?: IntersectionObserver;
  private frame = 0;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const reduceMotion =
      typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      this.render(this.appCountUp());
      return;
    }

    this.render(0);
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.observer?.disconnect();
          this.animate();
        }
      },
      { threshold: 0.5 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }

  private animate(): void {
    const target = this.appCountUp();
    const duration = 1600;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      this.render(target * eased);
      if (t < 1) this.frame = requestAnimationFrame(step);
    };
    this.frame = requestAnimationFrame(step);
  }

  private render(value: number): void {
    const decimals = this.decimals();
    this.el.nativeElement.textContent = value.toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
}
