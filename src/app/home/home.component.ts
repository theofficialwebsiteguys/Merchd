import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  bannerTitle = 'Featured Collections';
  bannerSubtitle = 'Explore Our Top Gift Ideas';

  gridItems = [
    {
      image: 'assets/shirt-dude.jpg',
      title: 'Clothing',
      description: 'Shirts, Shorts, Pants, Sweatshirts and more.'
    },
    {
      image: 'assets/rangers-bottle.jpg',
      title: 'Accessories',
      description: 'Light Up Your Pace'
    },
    {
      image: 'assets/stuffed-animal.jpg',
      title: 'Stuffed Animals',
      description: 'Item 3 Description'
    },
    {
      image: 'assets/ornaments.jpg',
      title: 'Other',
      description: 'Item 4 Description'
    }
  ];
}
