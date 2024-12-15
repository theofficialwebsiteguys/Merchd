import { Component, ElementRef, OnInit, ViewChild, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe, Stripe, StripeElements, StripeEmbeddedCheckout } from '@stripe/stripe-js';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { CartService } from '../cart.service';
import { firstValueFrom } from 'rxjs';


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

  shippingInfo = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  };

  shippingSubmitted = false;
  stripeInitialized = false;
  embeddedCheckout: StripeEmbeddedCheckout | undefined;

  constructor(private cartService: CartService) {}

  async ngOnInit(): Promise<void> {
    const stripeInstance = await loadStripe(environment.stripePublicKey);
    if (!stripeInstance) {
      console.error('Stripe failed to initialize.');
      return; // Exit early if Stripe couldn't load
    }
    this.stripe = stripeInstance;

    this.cartService.getClientSecret().subscribe((clientSecret) => {
      if (clientSecret) {
        this.initializeCheckout(clientSecret);
      } else {
        console.error('No client secret found.');
      }
    });
  }

  submitShippingInfo() {
    this.shippingSubmitted = true;

    this.cartService.checkout(this.shippingInfo);
    this.stripeInitialized = true;
  }

  private async initializeCheckout(clientSecret: string) {
    this.cleanupEmbeddedCheckout();
    this.embeddedCheckout = await this.stripe.initEmbeddedCheckout({
      fetchClientSecret: async () => clientSecret,
    });

    this.embeddedCheckout.mount('#checkout');
  }

  cleanupEmbeddedCheckout() {
    if (this.embeddedCheckout) {
      this.embeddedCheckout.destroy();
      this.embeddedCheckout = undefined;
    }
  }
}
