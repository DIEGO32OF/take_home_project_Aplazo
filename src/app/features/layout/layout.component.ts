import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoDashboardComponents } from '@apz/shared-ui/dashboard';
import { AplazoSidenavLinkComponent } from '../../../../projects/shared-ui/sidenav/src';
import { ROUTE_CONFIG } from '../../core/infra/config/routes.config';
import { AuthService } from '../../auth.service';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [
    AplazoDashboardComponents,
    AplazoButtonComponent,
    AplazoSidenavLinkComponent,
    RouterOutlet,
    RouterLink,
  ],
})
export class LayoutComponent {
  readonly #router = inject(Router);
  private readonly router = inject(Router);
  private authService= inject(AuthService)

  

  readonly appRoutes = ROUTE_CONFIG;

  clickLogo(): void {
    this.#router.navigate([ROUTE_CONFIG.app]);
  }

  closeSesion(): void{
    this.authService.logout()
    this.#router.navigate([ROUTE_CONFIG.home]);
  }

}
