import { CommonModule } from '@angular/common';
import { Component, Renderer2, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'] // Ensure this is "styleUrls" (plural)
})
export class HeroComponent {


  constructor(private router: Router, private route: ActivatedRoute, private renderer: Renderer2) {


  }
}
