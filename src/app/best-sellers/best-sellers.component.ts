import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.scss'
})
export class BestSellersComponent {

  filteredProducts: any;

  bestSellers: any[] = [];
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private cartService: CartService){

  }

  ngOnInit(){
    this.fetchBestSellers();
  }

  fetchBestSellers(): void {
    this.productService.getBestSellers().subscribe({
      next: (data) => {
        this.bestSellers = data;
        console.log(this.bestSellers)
      },
      error: (err) => {
        this.error = err;
      },
    });
  }

  viewProduct(product: any): void {
    this.productService.setSelectedProduct(product); // Set the selected product
    this.router.navigate(['/product']); // Navigate to the product display page
  }

  handleProductAction(product: any, event: Event): void {
    event.stopPropagation(); // Prevent the parent click event from firing

    if (product.is_customizable) {
      this.viewProduct(product); // Navigate to customization view
    } else {
      this.addToCart(product); // Add the product to the cart
    }
  }

  addToCart(product: any): void {
    console.log('Adding to cart:', product);
    // Mark product as "Adding to Cart"
    product.isAddingToCart = true;
    product.buttonLabel = 'Added to Cart!';

    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.display_image,
      customDescription: '',
      quantity: 1
    });

    setTimeout(() => {
      product.isAddingToCart = false;
      product.buttonLabel = product.is_customizable ? 'Customize Product' : 'Add to Cart';
    }, 2000); // 2 seconds for the acknowledgment
  }
}
