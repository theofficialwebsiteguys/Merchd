import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss'
})
export class ProductGalleryComponent {
  @Input() images: Array<{ image_url: string; alt_text?: string }> = [];
  @Input() productName!: string;
  activeImageIndex = 0;

  setActiveImage(index: number): void {
    this.activeImageIndex = index;
  }

  previousImage(): void {
    if (this.activeImageIndex > 0) {
      this.activeImageIndex--;
    }
  }

  nextImage(): void {
    if (this.activeImageIndex < this.images.length - 1) {
      this.activeImageIndex++;
    }
  }
}
