import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cart: any[] = [];
  subtotal: number = 0;
  totalItems: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
    console.log(this.cart)
  }

  loadCart(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotals();
  }

  updateQuantity(item: any, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(item);
    } else {
      this.cartService.updateItemQuantity(item.id, quantity, item);
      this.loadCart();
    }
  }

  removeItem(item: any): void {
    this.cartService.removeFromCart(item.id);
    this.loadCart();
  }

  calculateTotals(): void {
    this.totalItems = this.cart.reduce((acc, item) => acc + item.quantity, 0);
    this.subtotal = this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  checkout(): void {
    this.router.navigateByUrl('/checkout')
    // this.cartService.checkout();
  }
}