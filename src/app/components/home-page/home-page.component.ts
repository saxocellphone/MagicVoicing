import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slideInLeft } from '../../animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [slideInLeft]
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.navigate(['cards']);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
