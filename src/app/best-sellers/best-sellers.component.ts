import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.scss'
})
export class BestSellersComponent {

  filteredProducts: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService){

  }

  ngOnInit(){
    this.filteredProducts = this.productService.getBestSellers();
  }

  viewProduct(product: any): void {
    this.productService.setSelectedProduct(product); // Set the selected product
    this.router.navigate(['/product']); // Navigate to the product display page
  }
}
