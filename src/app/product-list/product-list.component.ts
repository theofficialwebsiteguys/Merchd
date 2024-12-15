import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryCardsComponent } from '../category-cards/category-cards.component';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CategoryCardsComponent, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  currentCategory: string | null = null;
  filteredProducts: any[] = []; // Filtered product list
  products: any[] = []; // Original unfiltered product list
  showFilters: boolean = false; // Controls the visibility of the filter sidebar
  error: string | null = null;
  

  inStockOnly: boolean = false; // Tracks if "In stock" filter is applied
  priceFilter: string | null = null; // Tracks selected price range

  categoryContent: { [key: string]: { title: string; subtitle: string } } = {
    CROCHET: {
      title: 'Creative Crochet Designs',
      subtitle: 'Unique, handcrafted crochet items for kids with a playful and imaginative twist.'
    },
    DECORATIONS: {
      title: 'Adorable Room Decorations',
      subtitle: 'Brighten your child’s space with charming, custom-made decorations.'
    },
    'STUFFED-ANIMALS': {
      title: 'Huggable Stuffed Animals',
      subtitle: 'Cuddly companions handcrafted with love for your little ones.'
    },
    CLOTHING: {
      title: 'Charming Children’s Clothing',
      subtitle: 'Stylish and comfortable custom outfits for your young fashionistas.'
    },
    ALL: {
      title: 'Explore Our Full Collection',
      subtitle: 'A wide variety of handcrafted products designed to inspire creativity and joy for kids of all ages.'
    }
  };


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  toggleFilters() {
    const filterSidebar = document.querySelector('.filter-sidebar');
    filterSidebar?.classList.toggle('active');
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.currentCategory = params.get('category');

      if (this.currentCategory) {
        // Fetch products based on category
        const fetchProducts = this.currentCategory === 'ALL'
          ? this.productService.getAllProducts()
          : this.productService.getProductsByCategory(this.currentCategory);

        fetchProducts.subscribe({
          next: (data) => {
            this.products = data; // Store original product list
            this.filteredProducts = [...this.products]; // Initialize filtered list
            console.log(this.filteredProducts);
          },
          error: (err) => {
            this.error = err;
          },
        });
      }
    });
  }

  getSectionTitle(): string {
    return this.categoryContent[this.currentCategory || 'default']?.title || '';
  }

  getSectionSubtitle(): string {
    return this.categoryContent[this.currentCategory || 'default']?.subtitle || '';
  }

  applyFilters(): void {
    // Start with the original product list
    let filtered = [...this.products];

    // Filter by availability
    if (this.inStockOnly) {
      filtered = filtered.filter((product) => product.quantity > 0);
    }

    // Filter by price range
    if (this.priceFilter) {
      switch (this.priceFilter) {
        case 'under25':
          filtered = filtered.filter((product) => product.price < 25);
          break;
        case '25to50':
          filtered = filtered.filter((product) => product.price >= 25 && product.price <= 50);
          break;
        case '50to100':
          filtered = filtered.filter((product) => product.price > 50 && product.price <= 100);
          break;
      }
    }

    // Update the filtered products
    this.filteredProducts = filtered;
  }

  filterByPrice(priceRange: string): void {
    this.priceFilter = priceRange; // Set the selected price range
    this.applyFilters(); // Reapply all filters
  }

  resetFilters(): void {
    this.inStockOnly = false; // Reset the "In Stock" filter
    this.priceFilter = null; // Reset the price filter
    this.filteredProducts = [...this.products]; // Reset to the original product list
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
