import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-cards.component.html',
  styleUrl: './category-cards.component.scss'
})
export class CategoryCardsComponent {
  gridItems = [
    {
      image: 'assets/no-background/fishing-buddy-nobg.png',
      title: 'Clothing',
      category: 'CLOTHING',
      description: 'Shirts, Shorts, Pants, Sweatshirts and more.'
    },
    {
      image: 'assets/no-background/bottle3-nobg.png',
      title: 'Decorations',
      category: 'DECORATIONS',
      description: 'Light Up Your Pace'
    },
    {
      image: 'assets/no-background/stuffed-animal-nobg.png',
      title: 'Stuffed Animals',
      category: 'STUFFED-ANIMALS',
      description: 'Item 3 Description'
    },
    {
      image: 'assets/no-background/crochet-hat-nobg.png',
      title: 'Crochet',
      category: 'CROCHET',
      description: 'Item 4 Description'
    }
  ];

  constructor(private productService: ProductService) {}

  setCategory(category: string): void {
    this.productService.setCategory(category); // Set the selected category in the service
  }
}
