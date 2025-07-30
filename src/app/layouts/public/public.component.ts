import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent {
  hideHeaderFooter = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkHeaderFooterVisibility(this.router.url);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkHeaderFooterVisibility(event.url);
      }
    });
  }

  checkHeaderFooterVisibility(url: string) {
    this.hideHeaderFooter = url.includes('/login') || url.includes('/forgot-password');
  }
}
