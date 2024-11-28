import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryCardsComponent } from '../category-cards/category-cards.component';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CategoryCardsComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  currentCategory: string | null = null;
  filteredProducts: any[] = [];
  showFilters: boolean = false; // Controls the visibility of the filter sidebar

  constructor(private productService: ProductService, private route: ActivatedRoute){ }


  toggleFilters() {
    const filterSidebar = document.querySelector('.filter-sidebar');
    filterSidebar?.classList.toggle('active');
  }

  ngOnInit(){
    this.route.queryParamMap.subscribe((params) => {
      this.currentCategory = params.get('category');

      if (this.currentCategory) {

        this.filteredProducts = this.currentCategory === 'ALL' ? this.productService.getAllProducts() : this.productService.getProductsByCategory(this.currentCategory.toUpperCase());
      }
    });
  }
}
