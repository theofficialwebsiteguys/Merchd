import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss'
})
export class ProductDisplayComponent {
  product: any;
  selectedImage!: string;
  selectedColor!: string;
  customText: string = '';
  quantity: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.product = this.productService.getSelectedProduct();
  }

  changeImage(image: string): void {
    this.selectedImage = image;
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(): void {
    const cartItem = {
      product: this.product,
      quantity: this.quantity,
      customization: {
        color: this.selectedColor,
        text: this.customText
      }
    };
    console.log('Item added to cart:', cartItem);
    // Add functionality to store cart item
  }
}
