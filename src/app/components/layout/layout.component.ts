import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MeterialModule } from '../../../Meterial.Module';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, MeterialModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
