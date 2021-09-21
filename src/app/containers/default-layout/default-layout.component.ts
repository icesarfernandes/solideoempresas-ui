import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  public loggedUser;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.authService.logout();
  }
}
