import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'maze-website';
  currentRoute: string = '';

  constructor(private router: Router) {
    // Get the current route
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
}
