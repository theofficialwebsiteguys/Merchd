import { Component, ElementRef, OnInit, ViewChild, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe, ResultAction, Stripe, StripeElements, StripeEmbeddedCheckout, StripeEmbeddedCheckoutShippingDetailsChangeEvent } from '@stripe/stripe-js';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { CartService } from '../cart.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


declare var google: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  private stripe!: Stripe;
  embeddedCheckout: StripeEmbeddedCheckout | undefined;
  stripeInitialized = false;

  constructor(private cartService: CartService, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    this.cartService.checkout();
    // Initialize Stripe
    const stripeInstance = await loadStripe(environment.stripePublicKey, {
      betas: ['embedded_checkout_byol_beta_1'],
    });
    if (!stripeInstance) {
      console.error('Stripe failed to initialize.');
      return;
    }
    this.stripe = stripeInstance;

    // Fetch client secret for checkout
    this.cartService.getClientSecret().subscribe((clientSecret) => {
      if (clientSecret) {
        this.initializeCheckout(clientSecret);
      } else {
        console.error('No client secret found.');
      }
    });
  }

  private async initializeCheckout(clientSecret: string) {
    console.log(clientSecret)
    try {
      // Clean up any existing embedded checkout instance
      this.cleanupEmbeddedCheckout();
  
      // Define the required onShippingDetailsChange handler
      const onShippingDetailsChange = async (
        shippingDetailsChangeEvent: StripeEmbeddedCheckoutShippingDetailsChangeEvent
      ): Promise<ResultAction> => {
        const { checkoutSessionId, shippingDetails } = shippingDetailsChangeEvent;
      
        try {
          // Use Angular's HTTP service to make the POST request
          const response = await firstValueFrom(
            this.http.post<{ type: string; message?: string }>(
              `${environment.api_url}/shipping/calculate-shipping-options`,
              {
                checkout_session_id: checkoutSessionId,
                shipping_details: shippingDetails,
              },
              {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  'Stripe-Version': '2024-04-10;checkout_server_update_beta=v1', // Required beta header
                }),
              }
            )
          );
      
          if (response.type === 'error') {
            return { type: 'reject', errorMessage: response.message }; // Matches ResultAction type
          } else {
            return { type: 'accept' }; // Matches ResultAction type
          }
        } catch (error) {
          console.error('Error updating shipping details:', error);
          return { type: 'reject', errorMessage: 'Unable to update shipping details.' };
        }
      };
      
      
      
      // Initialize Embedded Checkout
      this.embeddedCheckout = await this.stripe.initEmbeddedCheckout({
        fetchClientSecret: async () => clientSecret,
        onShippingDetailsChange: onShippingDetailsChange,
      });
      // Mount the checkout interface
      this.embeddedCheckout.mount('#checkout');
      this.stripeInitialized = true;
    } catch (error) {
      console.error('Error initializing Embedded Checkout:', error);
    }
  }
  

  cleanupEmbeddedCheckout() {
    if (this.embeddedCheckout) {
      this.embeddedCheckout.destroy();
      this.embeddedCheckout = undefined;
    }
  }

  ngOnDestroy() {
    this.cleanupEmbeddedCheckout();
  }
}
