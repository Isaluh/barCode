import { Component, Input } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';

type headerVariant = "neutro" | "semPerm" | "visual"

@Component({
  selector: 'headerComponent',
  standalone: true,
  imports: [NgOptimizedImage, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() variant : headerVariant = "visual";
}
