import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MeterialModule } from '../../../Meterial.Module';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, MeterialModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  router = inject(Router)

  onLogout() {
    localStorage.removeItem('passKeyLogin');
    this.router.navigate(['/login']);
  }
}
