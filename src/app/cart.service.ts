import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart'; // Key for localStorage

  private clientSecretSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Get all items from the cart
   */
  getCart(): any[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  /**
   * Add an item to the cart
   * @param item The item to add, including optional custom fields
   */
  addToCart(item: any): void {
    const cart = this.getCart();
    const existingItem = cart.find((cartItem) => cartItem.id === item.id && this.compareCustomFields(cartItem, item));

    if (existingItem) {
      // Increment quantity if item already exists and has the same custom fields
      existingItem.quantity += item.quantity || 1;
    } else {
      // Add new item with quantity defaulting to 1
      cart.push({ ...item, quantity: item.quantity || 1 });
    }

    this.updateCart(cart);
  }

  /**
   * Remove an item from the cart
   * @param itemId The ID of the item to remove
   */
  removeFromCart(itemId: string): void {
    const cart = this.getCart().filter((item) => item.id !== itemId);
    this.updateCart(cart);
  }

  /**
   * Update the quantity of a specific item in the cart
   * @param itemId The ID of the item to update
   * @param quantity The new quantity
   */
  updateItemQuantity(itemId: string, quantity: number, customFields?: any): void {
    const cart = this.getCart();
    const item = cart.find((cartItem) => cartItem.id === itemId && this.compareCustomFields(cartItem, customFields));

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        item.quantity = quantity;
        this.updateCart(cart);
      }
    }
  }

  /**
   * Clear the entire cart
   */
  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  /**
   * Private method to update the cart in localStorage
   * @param cart The updated cart array
   */
  private updateCart(cart: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  /**
   * Compare custom fields of items to determine if they match
   * @param existingItem The item already in the cart
   * @param newItem The item being added
   */
  private compareCustomFields(existingItem: any, newItem: any): boolean {
    // Compare custom fields such as customImage and customDescription
    return (
      existingItem.customImage === newItem.customImage &&
      existingItem.customDescription === newItem.customDescription
    );
  }

  checkout() {
    const line_items = this.getCart();
    console.log(line_items)
    return this.http
      .post<{ clientSecret: string }>(
        `${environment.api_url}/checkout/checkout`,
        { line_items },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Stripe-Version': '2024-04-10;checkout_server_update_beta=v1', // Add the required Stripe beta version header
          }),
        }
      )
      .subscribe({
        next: (response) => {
          this.clientSecretSubject.next(response.clientSecret); // Store clientSecret
          this.router.navigateByUrl('/checkout')
        },
        error: (err) => {
          console.error('Error creating checkout session:', err);
        },
      });

  }

  affectInventory() {

  // Map the inventory to match the backend's expected format
    const line_items = this.getCart().map(item => ({
      id: item.id,
      quantity: item.quantity
    }));
    
    return this.http
      .put<any>(`${environment.api_url}/checkout/affectInventory`, { line_items })
      .subscribe({
        next: (response) => {
          if(response)
            this.clearCart();
        },
        error: (err) => {
          console.error('Error clearing inventory of bought items:', err);
        },
      });

  }

  getClientSecret() {
    return this.clientSecretSubject.asObservable();
  }
  
}
