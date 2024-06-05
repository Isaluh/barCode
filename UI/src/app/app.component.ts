import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputsComponent } from './components/inputs/inputs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UI';
}
