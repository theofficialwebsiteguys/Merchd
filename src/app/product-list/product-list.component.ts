import { CommonModule, Location } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { CategoryCardsComponent } from '../category-cards/category-cards.component';
import { ProductService } from '../product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CategoryCardsComponent, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() currentCategory: string | null = null;
  filteredProducts: any[] = []; // Filtered product list
  products: any[] = []; // Original unfiltered product list
  showFilters: boolean = false; // Controls the visibility of the filter sidebar
  error: string | null = null;

  inStockOnly: boolean = false; // Tracks if "In stock" filter is applied
  priceFilter: string | null = null; // Tracks selected price range

  categoryContent: { [key: string]: { title: string; subtitle: string } } = {
    'SPORTS-APPAREL': {
      title: 'Shop Sports Apparel',
      subtitle: ''
    },
    COLLECTIBLES: {
      title: 'Shop Collectibles',
      subtitle: ''
    },
    OTHER: {
      title: 'Shop Other',
      subtitle: ''
    },
    ALL: {
      title: 'Explore Our Full Collection',
      subtitle: ''
    }
  };


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Listen for route changes to update the category
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.handleCategoryChange(); // React to query parameter changes
      });

    // Initial load
    this.handleCategoryChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentCategory'] && !changes['currentCategory'].firstChange) {
      this.refreshComponent(); // React to input changes
    }
  }

  handleCategoryChange(): void {
    // Get the category from query parameters
    const categoryFromParams = this.route.snapshot.queryParamMap.get('category');
    this.currentCategory = categoryFromParams || this.currentCategory || 'ALL'; // Prioritize query params

    // Refresh component data
    this.refreshComponent();
  }

  refreshComponent(): void {
    // Fetch products based on the current category
    const fetchProducts =
      this.currentCategory === 'ALL'
        ? this.productService.getAllProducts()
        : this.productService.getProductsByCategory(this.currentCategory!);

    fetchProducts.subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
      },
      error: (err) => {
        this.error = err;
        console.error('Error fetching products:', err);
      },
    });
  }

  getSectionTitle(): string {
    return this.categoryContent[this.currentCategory || 'default']?.title || '';
  }

  getSectionSubtitle(): string {
    return this.categoryContent[this.currentCategory || 'default']?.subtitle || '';
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
