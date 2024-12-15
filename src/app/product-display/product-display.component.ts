import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ProductGalleryComponent } from '../product-gallery/product-gallery.component';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BreadcrumbComponent, ProductGalleryComponent],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss'
})
export class ProductDisplayComponent {
  product: any;
  selectedImage!: string;
  selectedColor!: string;
  customText: string = '';
  quantity: number = 1;

  
  uploadedImage: FormData | null = null;
  customDescription: string = ''

  showToastMessage: boolean = false;

  activeImageIndex = 0; // Start with the first image

  constructor(private productService: ProductService, private location: Location, private cartService: CartService) {}

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
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.display_image,
      customDescription: this.customDescription,
      quantity: this.quantity
    });

    this.showToast();
  }
  


  showToast() {
    this.showToastMessage = true;

    // Hide toast after 3 seconds
    setTimeout(() => {
      this.showToastMessage = false;
    }, 3000);
  }


  goBack(): void {
    this.location.back();
  }

  isCustomizationComplete(): boolean {
    // Ensure all customization fields are filled
    return this.customDescription.trim().length > 0;
  }
  
  // Trigger file input programmatically
  triggerFileUpload(): void {
    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }


}
